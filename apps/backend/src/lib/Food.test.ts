import { expect } from "jsr:@std/expect";
import { isFood } from "./Food.ts";

Deno.test("isFood", async (t) => {
    await t.step("it returns true with a valid object", () => {
        expect(isFood({ name: "apple", amount: "3" })).toEqual(true);
        expect(isFood({ name: null, amount: "3" })).toEqual(false);
        expect(isFood({ name: "apple", amount: null })).toEqual(false);
        expect(isFood({ name: null, amount: null })).toEqual(false);
        expect(isFood({ name: undefined, amount: undefined })).toEqual(false);
        expect(isFood({ name: "", amount: "" })).toEqual(true);
        expect(isFood({ name: "" })).toEqual(false);
        expect(isFood({ amount: "" })).toEqual(false);
    });
});
