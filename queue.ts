export type Name = "apple";

export type Food = {
    food: Name;
    amount: number;
};

const food: Food = {
    food: "apple",
    amount: 3,
};

const kv = await Deno.openKv();

await kv.enqueue(food);
