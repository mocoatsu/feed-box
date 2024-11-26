import { AnimalRepository } from "../../lib/src/repository/AnimalRepository.ts";
import { validate } from "./validate.ts";

export const kv = await Deno.openKv();

kv.listenQueue(async (msg: unknown) => {
    const { data, error } = validate(msg);
    if (!data) return console.error(error);

    const animals = await AnimalRepository.findById(data.clientId);

    animals.map((animal) =>
        console.log(`name: ${animal.name}, hangry: ${animal.hangry}`)
    );
});
