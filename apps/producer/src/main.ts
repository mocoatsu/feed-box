import { kv } from "../../consumer/src/main.ts";
import { isFood } from "../../lib/src/Food.ts";
import {
  queueService,
} from "../../lib/src/message-broker/message-broker.service.ts";

Deno.serve((req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("open", () => {
    console.log("a client connected!");
  });

  socket.addEventListener("message", async (event) => {
    try {
      const food = JSON.parse(event.data);
      isFood(food) && await queueService.addNotification(kv, food);
    } catch (e) {
      console.error(e);
      return;
    }
  });

  return response;
});
