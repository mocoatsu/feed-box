import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const schema = z.object({
    amount: z.preprocess((v) => Number(String(v)), z.number().gt(0)),
    clientId: z.string(),
    name: z.string(),
}).strict();

export const validate = (
    v: unknown,
) => {
    const { success, data, error } = schema.safeParse(v);
    if (!success) return { data: null, error: error.message };

    return { data, error: null };
};
