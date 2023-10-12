import { Client } from '@stomp/stompjs';
import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

import Aside from "../../components/Aside";

import { useAuthValue } from "../../context/AuthContext";

function Dashboard() {
  const { getUser } = useAuthValue();
  
  useEffect(() => {
    const testMAC = "00B0D063C226";
    const { accessToken } = JSON.parse(getUser());

    const client = new Client({
      brokerURL: 'ws://localhost:8080/water-monitor-websocket',
      onConnect: () => {
        console.log("Conectado!");
        
        client.subscribe(`/topic/monitor/${testMAC}`, (message) => {
          if (message.body) {
            console.log(`Mensagem recebida:\n${message.body}`);
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
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    client.activate();
  }, []);

  return (
    <div className="min-h-screen bg-mainBlack flex flex-col lg:flex-row">
      <Aside className="lg:flex" />
      <div className="w-full lg:ml-[270px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
