import { Animal } from "../../lib/src/Animal.ts";
import { isFood } from "../../lib/src/Food.ts";

export const kv = await Deno.openKv();

const elephant = new Animal("elephant", 10);

kv.listenQueue((msg: unknown) => {
    console.log("msg", msg);
    if (!isFood(msg)) return;

    elephant.eat(msg);

    console.log(`${elephant.name}: ${elephant.hangry}`);
    if (elephant.isFull()) console.log("full");
});
