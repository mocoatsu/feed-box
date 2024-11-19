import type { Food } from "./Food.ts";

type Name = "elephant" | "sheep";

export class Animal {
    #name: string;
    #hangry: number;

    constructor(name: Name, hangry: number) {
        this.#name = name;
        this.#hangry = hangry;
    }

    get name() {
        return this.#name;
    }

    get hangry() {
        return this.#hangry;
    }

    set hangry(v: number) {
        this.#hangry = v;
    }

    eat(food: Food) {
        this.#hangry = Math.max(this.#hangry - food.amount, 0);
    }

    isFull() {
        return this.#hangry === 0;
    }
}
