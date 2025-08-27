import { StandardSchemaV1 } from "@standard-schema/spec";
export class Slot<T, S extends StandardSchemaV1<unknown, T>> {
    #private;
    get schema(): S;
    constructor({ schema }: {
        schema: S;
    });
}

//# sourceMappingURL=index.d.ts.map
