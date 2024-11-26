import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

import { animalConverter } from "./animal.converter.ts";
import { AnimalEntity } from "../../../lib/src/AnimalEntity.ts";

describe("animalConverter", () => {
    describe("toEntities", () => {
        const subject = animalConverter.toEntities;

        it("converts to entities from a model", async () => {
            expect(await subject([{ name: "elephant", hangry: 10 }]))
                .toStrictEqual({
                    data: [new AnimalEntity("elephant", 10)],
                    error: null,
                });
            expect(
                await subject([{ name: "elephant", hangry: 10 }, {
                    name: "rabbit",
                    hangry: 3,
                }]),
            )
                .toStrictEqual({
                    data: [
                        new AnimalEntity("elephant", 10),
                        new AnimalEntity("rabbit", 3),
                    ],
                    error: null,
                });
            expect(await subject([])).toStrictEqual({ data: [], error: null });
            expect(await subject("")).toStrictEqual({
                data: null,
                error: new Error("An invalid arg"),
            });
            expect(await subject(undefined)).toStrictEqual({
                data: null,
                error: new Error("An invalid arg"),
            });
            expect(await subject(null)).toStrictEqual({
                data: null,
                error: new Error("An invalid arg"),
            });
        });
    });

    describe("toModel", () => {
        const subject = animalConverter.toModel;

        it("converts to a model from a entity", async () => {
            expect(await subject(new AnimalEntity("elephant", 10))).toEqual({
                name: "elephant",
                hangry: 10,
            });
        });
    });
});
