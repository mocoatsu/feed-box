import { kv } from "../../consumer/src/main.ts";
import { validate } from "../../consumer/src/validate.ts";
import {
  queueService,
} from "../../lib/src/message-broker/message-broker.service.ts";
import { animalService } from "../../lib/src/services/animal.service.ts";

Deno.serve((req) => {
  const clientId = crypto.randomUUID();

  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.addEventListener("open", () => {
    animalService.init(clientId);
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
