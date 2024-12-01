import { kv } from "../../consumer/src/main.ts";
import { validate } from "../../consumer/src/validate.ts";
import {
  queueService,
} from "../../lib/src/message-broker/message-broker.service.ts";
import { animalService } from "../../lib/src/services/animal.service.ts";

const sockets = new Map<string, WebSocket>();

Deno.serve(async (req) => {
  const clientId = crypto.randomUUID();

  if (req.headers.get("upgrade") != "websocket") {
    if (req.method == "POST") {
      const body = await req.json();
      const socket = sockets.get(body?.clientId);
      socket?.send(JSON.stringify(body?.animals));
      return new Response(null, { status: 200 });
    }

    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.addEventListener("open", () => {
    animalService.init(clientId);
    sockets.set(clientId, socket);
    console.log("a client connected!");
  });

  socket.addEventListener("message", async (event) => {
    try {
      const food = JSON.parse(event.data);
      validate(food) &&
        await queueService.addNotification(kv, {
          ...food,
          clientId,
        });
    } catch (e) {
      console.error(e);
      return;
    }
  });

  return response;
});
