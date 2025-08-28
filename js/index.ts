import { StandardSchemaV1 } from "@standard-schema/spec"
import { prompt } from "./prompt.ts";
export type Kind<T> = { output(value: T): void } | { input: T };
export class Slot<T, S extends StandardSchemaV1<unknown, T>> {
    #schema: S;
    #kind: Kind<T>;
    get schema(): S {
        return this.#schema;
    }
    get kind(): Kind<T> {
        return this.#kind;
    }

    constructor({ schema, kind }: { schema: S, kind: Kind<T> }) {
        this.#schema = schema;
        this.#kind = kind;
    }
}
export interface LLM {
    startSession(system: string): Promise<LLMSession>
}
export interface LLMSession {
    chat(iter: { next(): Promise<string | null> }): Promise<string>
}
export type NaturalFunctionArgs = {};
export class LLMPool {
    #llm: LLM;
    constructor({ llm }: { llm: LLM }) {
        this.#llm = llm;
    }
    #naturalFunction({ }: NaturalFunctionArgs): (strings: TemplateStringsArray, ...args: any[]) => Promise<string> {

        return async (strings, ...args) => {
            llmDesiredResponse: for (; ;) {
                const session = await this.#llm.startSession(prompt({}));
                let placeholderMode = false;
                const argsBackup = args;
                let resp = await session.chat({
                    async next() {
                        if (args) {
                            const str = strings.slice(1).reduce((prev, cur, i) => `${prev}${args[i] instanceof Slot && 'output' in args[i].kind ? `{{placeholder ${placeholderMode = true, i}}}` : args[i]}${cur}`, strings[0]);
                            args = null;
                            return str;
                        } else {
                            return null;
                        }
                    }
                });
                if (placeholderMode) {
                    for (let i = 0; i < argsBackup.length; i++) {
                        if (args[i] instanceof Slot && 'output' in args[i].kind) {
                            const placeholder = `{{placeholder ${i}}}:`;
                            let done = false;
                            resp = resp.replace(new RegExp(`${placeholder}:([^\n]*)\n`), (s, resp) => {
                                args[i].kind.output(resp);
                                done = true;
                                return "";
                            });
                            if (!done) {
                                continue llmDesiredResponse;
                            }
                        }
                    }
                    return resp;
                } else {
                    return resp;
                }
            }
        }
    }
    get naturalFunction() {
        return arg => this.#naturalFunction(arg);
    }
}