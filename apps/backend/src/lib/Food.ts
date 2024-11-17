export type Name = "apple" | "grass";

export type Food = {
    name: Name;
    amount: number;
};

export function isFood(o: unknown): o is Food {
    if ((o as Food)?.name == undefined) return false;
    if ((o as Food)?.amount == undefined) return false;
    return true;
}
