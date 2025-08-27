import { StandardSchemaV1 } from "@standard-schema/spec";
export type Kind<T> = {
    output(value: T): void;
} | {
    input: T;
};
export class Slot<T, S extends StandardSchemaV1<unknown, T>> {
    #private;
    get schema(): S;
    get kind(): Kind<T>;
    constructor({ schema, kind }: {
        schema: S;
        kind: Kind<T>;
    });
}
export interface LLM {
    startSession(system: string): Promise<LLMSession>;
}
export interface LLMSession {
    chat(iter: {
        next(): Promise<string | null>;
    }): Promise<string>;
}
export type NaturalFunctionArgs = {};
export class LLMPool {
    #private;
    constructor({ llm }: {
        llm: LLM;
    });
    get naturalFunction(): ({}: NaturalFunctionArgs) => (strings: TemplateStringsArray, ...args: any[]) => Promise<string>;
}

//# sourceMappingURL=index.d.ts.map
