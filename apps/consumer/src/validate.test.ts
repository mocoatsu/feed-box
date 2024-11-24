import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

import { validate } from "./validate.ts";

describe("validate", () => {
    const subject = validate;

    it("returns an obj with data when it takes a valid obj", () => {
        expect(subject({ amount: "3", clientId: "xxxx", name: "apple" }))
            .toStrictEqual(
                {
                    data: {
                        amount: 3,
                        clientId: "xxxx",
                        name: "apple",
                    },
                    error: null,
                },
            );
    });

    it("returns an obj with error when it takes a invalid obj", () => {
        expect(subject({ amount: "3", clientId: "xxxx" }))
            .toStrictEqual(
                {
                    data: null,
                    error: expect.any(String),
                },
            );

        expect(
            subject({
                amount: "3",
                clientId: "xxxx",
                name: "apple",
                foo: "foo",
            }),
        )
            .toStrictEqual(
                {
                    data: null,
                    error: expect.any(String),
                },
            );
    });

    describe("amount", () => {
        it("returns an obj with a valid arg", () => {
            const props = { clientId: "xxx", name: "apple" };

            expect(subject({ ...props, amount: 1 }).data).toEqual({
                ...props,
                amount: 1,
            });
            expect(subject({ ...props, amount: "1" }).data).toEqual({
                ...props,
                amount: 1,
            });
        });

        it("returns null with a invalid arg", () => {
            const props = { clientId: "xxx", name: "apple" };

            expect(subject({ ...props, amount: "xxx" }).data).toBeNull();
            expect(subject({ ...props, amount: null }).data).toBeNull();
            expect(subject({ ...props, amount: undefined }).data).toBeNull();
            expect(subject({ ...props, amount: true }).data).toBeNull();
        });
    });

    describe("clientId", () => {
        it("returns an obj with a valid arg", () => {
            const props = { amount: 1, name: "apple" };

            expect(subject({ ...props, clientId: "" }).data).toEqual({
                ...props,
                clientId: "",
            });
            expect(subject({ ...props, clientId: "xxx" }).data).toEqual({
                ...props,
                clientId: "xxx",
            });
        });

        it("returns null with a invalid arg", () => {
            const props = { amount: 1, name: "apple" };

            expect(subject({ ...props, clientId: 1 }).data).toBeNull();
            expect(subject({ ...props, clientId: true }).data).toBeNull();
            expect(subject({ ...props, clientId: null }).data).toBeNull();
            expect(subject({ ...props, clientId: undefined }).data).toBeNull();
        });
    });

    describe("name", () => {
        it("returns an obj with a valid arg", () => {
            const props = { amount: 1, clientId: "xxx" };

            expect(subject({ ...props, name: "" }).data).toEqual({
                ...props,
                name: "",
            });
            expect(subject({ ...props, name: "apple" }).data).toEqual({
                ...props,
                name: "apple",
            });
        });

        it("returns null with a invalid arg", () => {
            const props = { amount: 1, name: "apple" };

            expect(subject({ ...props, name: 1 }).data).toBeNull();
            expect(subject({ ...props, name: true }).data).toBeNull();
            expect(subject({ ...props, name: null }).data).toBeNull();
            expect(subject({ ...props, name: undefined }).data).toBeNull();
        });
    });
});
