import { StandardSchemaV1 } from "@standard-schema/spec"
export class Slot<T,S extends StandardSchemaV1<unknown, T>> {
    #schema: S;
    get schema() {
        return this.#schema;
    }

    constructor({ schema }: { schema: S }) {
        this.#schema = schema;
    }
}