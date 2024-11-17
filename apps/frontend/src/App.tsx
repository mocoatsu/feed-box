import "./App.css";

// @deno-types="@types/react"
import { useEffect, useRef } from "react";

function App() {
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    const websocket = new WebSocket("ws://127.0.0.1:8000");
    socketRef.current = websocket;

    websocket.addEventListener("open", () => {
      console.log("Connection established");
    });

    websocket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
    });

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <>
      <h1>feed box</h1>
      <div className="card">
        <button
          onClick={() =>
            socketRef.current?.send(
              JSON.stringify({ name: "apple", amount: "3" }),
            )}
        >
          add an apple
        </button>
      </div>
    </>
  );
}

export default App;
