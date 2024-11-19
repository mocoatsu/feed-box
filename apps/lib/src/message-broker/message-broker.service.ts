export const queueService = {
    async addNotification(kv: Deno.Kv, o: unknown) {
        await kv.enqueue(o);
    },
};
