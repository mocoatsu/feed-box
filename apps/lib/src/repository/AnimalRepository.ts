import { AnimalEntity } from "../../../lib/src/AnimalEntity.ts";
import { animalConverter } from "./animal.converter.ts";
import { kv } from "../../../consumer/src/main.ts";

export const AnimalRepository = {
    async createMany(clientId: string, entities: AnimalEntity[]) {
        await kv.set(
            [clientId, "animals"],
            entities.map((e) => animalConverter.toModel(e)),
        );
    },

    async findById(id: string) {
        const { data, error } = animalConverter.toEntities(
            (await kv.get([id, "animals"])).value,
        );
        if (!data) throw error;

        return data;
    },
};
