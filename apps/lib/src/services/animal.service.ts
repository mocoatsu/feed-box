import { AnimalEntity } from "../AnimalEntity.ts";
import { Animal } from "../repository/animal.converter.ts";
import { AnimalRepository } from "../repository/AnimalRepository.ts";

export const animalService = {
    async createMany(clientId: string, animals: AnimalEntity[]) {
        return await AnimalRepository.createMany(clientId, animals);
    },

    async init(clientId: string) {
        const animals = [
            new AnimalEntity("elephant", 10),
            new AnimalEntity("rabbit", 3),
        ];
        await this.createMany(clientId, animals);
    },

    isAnimal: (o: unknown): o is Animal => {
        if (
            (o as Animal)?.hangry == undefined &&
            (typeof (o as Animal)?.hangry == "number")
        ) return false;

        if (
            (o as Animal)?.name == undefined &&
            typeof (o as Animal)?.name == "string"
        ) return false;

        return true;
    },
};
