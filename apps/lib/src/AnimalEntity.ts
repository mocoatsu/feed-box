import type { Food } from "./Food.ts";

export class AnimalEntity {
    #name: string;
    #hangry: number;

    constructor(name: string, hangry: number) {
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
        return this;
    }

    isFull() {
        return this.#hangry === 0;
    }
}
