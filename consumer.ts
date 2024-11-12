import { Food } from "./queue.ts";

function isFood(o: unknown): o is Food {
    if ((o as Food)?.food == undefined) return false;
    if ((o as Food)?.amount == undefined) return false;
    return true;
}

const kv = await Deno.openKv();

kv.listenQueue((msg) => {
    if (!isFood(msg)) return;
    console.log(`${msg.food}: ${msg.amount}`);
});
