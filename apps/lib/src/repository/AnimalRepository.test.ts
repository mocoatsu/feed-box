import { expect } from "jsr:@std/expect";
import { afterAll, beforeEach, describe, it } from "jsr:@std/testing/bdd";

import { AnimalRepository } from "./AnimalRepository.ts";

describe("AnimalRepository", () => {
    let kv: Deno.Kv;

    beforeEach(async () => {
        kv = await Deno.openKv();
    });

    afterAll(async () => {
        await kv.close();
    });

    describe("findById", () => {
        const subject = AnimalRepository.findById;

        it("returns an obj with a valid arg", async () => {
            const clientId = "clientId";
            await kv.set([clientId, "animals"], [
                { name: "elephant", hangry: 10 },
                { name: "rabbit", hangry: 3 },
            ]);

            const result = await subject(clientId);

            expect(result).toHaveLength(2);
            expect(result[0].name).toEqual("elephant");
            expect(result[0].hangry).toEqual(10);
            expect(result[1].name).toEqual("rabbit");
            expect(result[1].hangry).toEqual(3);
        });
    });
});
