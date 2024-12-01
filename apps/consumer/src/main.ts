import { AnimalRepository } from "../../lib/src/repository/AnimalRepository.ts";
import { validate } from "./validate.ts";

export const kv = await Deno.openKv();

kv.listenQueue(async (msg: unknown) => {
    const { data, error } = validate(msg);
    if (!data) return console.error(error);
    const { clientId, name, amount } = data;

    const _animals = await AnimalRepository.findById(clientId);
    const animals = _animals.map((a) => a.eat({ name, amount }));
    await AnimalRepository.createMany(clientId, animals);

    await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientId: data.clientId,
            animals: animals.map((a) => {
                return { name: a.name, hangry: a.hangry };
            }),
        }),
    });

    _animals.map((animal) =>
        console.log(`name: ${animal.name}, hangry: ${animal.hangry}`)
    );
});
