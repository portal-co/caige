import { StandardSchemaV1 } from "@standard-schema/spec"
export class Slot<T> {
    #schema: StandardSchemaV1<unknown, T>;
    get schema() {
        return this.#schema;
    }

    constructor({ schema }: { schema: StandardSchemaV1<unknown, T> }) {
        this.#schema = schema;
    }
}