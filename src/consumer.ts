import { Food } from "./queue.ts";

type Animal = { name: string; hangry: number; full: () => boolean };
const ANIMALS: Animal[] = [{ name: "elephant", hangry: 100 }];
const elephant = ANIMALS[0];

function isFood(o: unknown): o is Food {
    if ((o as Food)?.name == undefined) return false;
    if ((o as Food)?.amount == undefined) return false;
    return true;
}

const kv = await Deno.openKv();

kv.listenQueue((msg) => {
    if (!isFood(msg)) return;
    elephant.hangry -= msg.amount;
    console.log(`${msg.name}: ${msg.amount}`);
    console.log(`${elephant.name}: ${elephant.hangry}`);
});
