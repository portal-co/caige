function $e5d5240ffa7dcf00$export$195ba6d62321b933({}) {
    return `
You are a Large Language Model agent who answers questions. You generate short (preferably a few words), consistent, responses to queries as they are part of a larger application. If the query is a statement, and it contains {{placeholders}}, write answers which would replace them out in the following format:

{{placeholder}}: answer

Remember to keep answers brief and consistent, regardless of whether they are to a question or a filled-in placeholder.
`;
}


class $c3f6c693698dc7cd$export$8c6ed5c666ac1360 {
    #schema;
    #kind;
    get schema() {
        return this.#schema;
    }
    get kind() {
        return this.#kind;
    }
    constructor({ schema: schema, kind: kind }){
        this.#schema = schema;
        this.#kind = kind;
    }
}
class $c3f6c693698dc7cd$export$eb5cef0563b96cdb {
    #llm;
    constructor({ llm: llm }){
        this.#llm = llm;
    }
    #naturalFunction({}) {
        return async (strings, ...args)=>{
            llmDesiredResponse: for(;;){
                const session = await this.#llm.startSession((0, $e5d5240ffa7dcf00$export$195ba6d62321b933)({}));
                let placeholderMode = false;
                const argsBackup = args;
                let resp = await session.chat({
                    async next () {
                        if (args) {
                            const str = strings.slice(1).reduce((prev, cur, i)=>`${prev}${args[i] instanceof $c3f6c693698dc7cd$export$8c6ed5c666ac1360 && 'output' in args[i].kind ? `{{placeholder ${placeholderMode = true, i}}}` : args[i]}${cur}`, strings[0]);
                            args = null;
                            return str;
                        } else return null;
                    }
                });
                if (placeholderMode) {
                    for(let i = 0; i < argsBackup.length; i++)if (args[i] instanceof $c3f6c693698dc7cd$export$8c6ed5c666ac1360 && 'output' in args[i].kind) {
                        const placeholder = `{{placeholder ${i}}}:`;
                        let done = false;
                        resp = resp.replace(new RegExp(`${placeholder}:([^\n]*)\n`), (s, resp)=>{
                            args[i].kind.output(resp);
                            done = true;
                            return "";
                        });
                        if (!done) continue llmDesiredResponse;
                    }
                    return resp;
                } else return resp;
            }
        };
    }
    get naturalFunction() {
        return (arg)=>this.#naturalFunction(arg);
    }
}


export {$c3f6c693698dc7cd$export$8c6ed5c666ac1360 as Slot, $c3f6c693698dc7cd$export$eb5cef0563b96cdb as LLMPool};
//# sourceMappingURL=index.js.map
