import "./App.css";

// @deno-types="@types/react"
import { useEffect, useRef, useState } from "react";

function App() {
  const socketRef = useRef<WebSocket>();
  const [animals, setAnimals] = useState<{ name: string; hangry: number }[]>(
    [],
  );

  useEffect(() => {
    const websocket = new WebSocket("ws://127.0.0.1:8000");
    socketRef.current = websocket;

    websocket.addEventListener("open", () => {
      console.log("Connection established");
    });

    websocket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      setAnimals(JSON.parse(event.data));
    });

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <>
      <h1>feed box</h1>
      <div className="card">
        <p>
          {animals.map((animal) =>
            `name:${animal.name}, hangry:${animal.hangry}\n`
          )}
        </p>
        <button
          onClick={() =>
            socketRef.current?.send(
              JSON.stringify({ name: "apple", amount: "1" }),
            )}
        >
          add an apple
        </button>
      </div>
    </>
  );
}

export default App;
