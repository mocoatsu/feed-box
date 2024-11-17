import { Animal } from "./lib/Animal.ts";
import { isFood } from "./lib/Food.ts";

const elephant = new Animal("elephant", 10);

export const kv = await Deno.openKv();

kv.listenQueue((msg: unknown) => {
    if (!isFood(msg)) return;

    elephant.eat(msg);

    console.log(`${elephant.name}: ${elephant.hangry}`);
    if (elephant.isFull()) console.log("full");
});
