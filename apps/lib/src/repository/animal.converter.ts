import { AnimalEntity } from "../../../lib/src/AnimalEntity.ts";
import { animalService } from "../../../lib/src/services/animal.service.ts";

export type Animal = {
    hangry: number;
    name: string;
};

export const animalConverter = {
    toEntities: (objs: unknown) => {
        if (!Array.isArray(objs)) {
            return { data: null, error: Error("An invalid arg") };
        }

        try {
            const entities = objs.map((o) => {
                if (!animalService.isAnimal(o)) {
                    throw new Error("invalid data");
                }
                return new AnimalEntity(o.name, o.hangry);
            });
            return { data: entities, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

    toModel(entity: AnimalEntity) {
        return { name: entity.name, hangry: entity.hangry };
    },
};
