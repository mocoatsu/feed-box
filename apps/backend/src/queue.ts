import { kv } from "./consumer.ts";

export const queueService = {
    async addNotification(o: unknown) {
        await kv.enqueue(o);
    },
};
