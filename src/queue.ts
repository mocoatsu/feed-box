export type Name = "apple" | "grass";

export type Food = {
    name: Name;
    amount: number;
};

const food: Food = {
    name: "apple",
    amount: 3,
};

const kv = await Deno.openKv();

while (true) {
    await kv.enqueue(food);
    await new Promise((resolve) => {
        console.log(`food:${food.name} added`);
        setTimeout(resolve, 1000);
    });
}
