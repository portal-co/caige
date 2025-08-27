import { StandardSchemaV1 } from "@standard-schema/spec";
export class Slot<T> {
    #private;
    get schema(): StandardSchemaV1<unknown, T>;
    constructor({ schema }: {
        schema: StandardSchemaV1<unknown, T>;
    });
}

//# sourceMappingURL=index.d.ts.map
