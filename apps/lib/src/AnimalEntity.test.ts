import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

import { AnimalEntity } from "./AnimalEntity.ts";

describe("AnimalEntity", () => {
    describe(".eat()", () => {
        it("decrease hangry", () => {
            const name = "apple";
            const entity = new AnimalEntity("elephant", 10);

            {
                entity.eat({ amount: 1, name });
                expect(entity.hangry).toEqual(9);
            }
            {
                entity.eat({ amount: 5, name });
                expect(entity.hangry).toEqual(4);
            }
            {
                entity.eat({ amount: 5, name });
                expect(entity.hangry).toEqual(0);
            }
        });
    });

    describe(".isFull()", () => {
        it("returns true if hangry == 0", () => {
            expect(new AnimalEntity("elephant", 10).isFull()).toEqual(false);
            expect(new AnimalEntity("elephant", 0).isFull()).toEqual(true);
        });
    });
});
