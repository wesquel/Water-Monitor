import { createContext, useEffect, useState } from "react";
import { useAuthValue } from "./AuthContext";
import { Client } from "@stomp/stompjs";

export const WebsocketContext = createContext([]);

export function WebsocketProvider({ children }) {
  const [message, setMessage] = useState({});
  const [lastUpdate, setLastUpadate] = useState(null);
  const { getToken } = useAuthValue();

  useEffect(() => {
    const testMAC = "00B0D063C226";
    const accessToken = getToken();

    const client = new Client({
      brokerURL: "ws://localhost:8080/water-monitor-websocket",
      onConnect: () => {
        console.log("Conectado!");

        client.subscribe(`/topic/monitor/${testMAC}`, (message) => {
          if (message.body) {
            handleMessage(message.body);
          }
        });
      },
      onDisconnect: () => {
        console.log("Desconectado!");
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    client.activate();
  }, []);

  const handleMessage = (message) => {
    setMessage(JSON.parse(message));
    setLastUpadate(new Date());
  };
  return (
    <WebsocketContext.Provider value={{ message, lastUpdate }}>
      {children}
    </WebsocketContext.Provider>
  );
}
