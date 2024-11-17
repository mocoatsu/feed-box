import { isFood } from "./lib/Food.ts";
import { queueService } from "./queue.ts";

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
      isFood(food) && await queueService.addNotification(food);
    } catch (e) {
      console.error(e);
      return;
    }
  });
  return response;
});
