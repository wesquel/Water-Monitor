import Card from "../../../components/Card";
import ChangeFilterDateButton from "../../../components/ChangeFilterDateButton";
import LineChart from "../../../components/LineChart";
import { ReactComponent as Thermometer } from "../../../assets/thermometer.svg";
import { ReactComponent as Turbidity } from "../../../assets/turbidity.svg";
import { ReactComponent as Bolt } from "../../../assets/bolt.svg";
import { ReactComponent as WaterDrop } from "../../../assets/waterDrop.svg";
import Ph from "../../../assets/ph.png";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../../context/WebsocketContext";

const motionProperties = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function CaixaAllDashboardSection() {
  const { message, lastUpdate } = useContext(WebsocketContext);
  const [lastMessageUpdate, setLastDateUpadate] = useState("--");

  const handleLasUpdate = (lastUpdate) => {
    if (lastUpdate !== null) {
      setLastDateUpadate(
        lastUpdate.toLocaleDateString("pt-BR") +
          " " +
          lastUpdate.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
      );
    }
  };

  useEffect(() => {
    handleLasUpdate(lastUpdate);
  }, [lastUpdate]);

  return (
    <div className="p-2 w-full min-h-screen lg:px-20 lg:py-14 xl:px-28 flex flex-col justify-center">
      <div className="grid gap-9 mb-9 lg:grid-cols-4 lg:grid-rows-1 grid-cols-1 grid-rows-2 items-center">
        <p className="lg:col-span-3 text-mainWhite">
          Última atualização: {lastMessageUpdate}
        </p>
        {/* <ChangeFilterDateButton /> */}
      </div>
      <div className="grid gap-9 mb-9 2xl:grid-cols-5 2xl:grid-rows-1 lg:grid-cols-3 lg:grid-rows-2 md:grid-cols-3 md:grid-rows-2 sm:grid-cols-2 sm:grid-rows-3 grid-cols-1 grid-rows-5">
        <Card>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Thermometer />
            <span className="text-xs break-all">Temperatura</span>
          </motion.div>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex  items-start justify-center"
          >
            <span className="text-4xl break-all">
              {message.temperatura !== undefined ? message.temperatura : "--"}
            </span>
            <span className="text-xs">°C</span>
          </motion.div>
        </Card>
        <Card>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Turbidity className="w-12 h-12" />
            <span className="text-xs break-all">Turbidez</span>
          </motion.div>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex  items-start justify-center"
          >
            <span className="text-4xl break-all">
              {message.turbidez !== undefined ? message.turbidez : "--"}
            </span>
            <span className="text-xs">NTU</span>
          </motion.div>
        </Card>
        <Card>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Bolt />
            <span className="text-xs break-all">Condutividade</span>
          </motion.div>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex items-start justify-center"
          >
            <span className="text-4xl break-all">
              {message.condutividade !== undefined
                ? message.condutividade
                : "--"}
            </span>
            <span className="text-xs">μS/cm</span>
          </motion.div>
        </Card>
        <Card>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex flex-col items-center justify-center gap-2"
          >
            <img src={Ph} className="w-12 invert p-1" />
            <span className="text-xs break-all">pH</span>
          </motion.div>
          <motion.span
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="text-4xl break-all flex items-center justify-center"
          >
            {message.ph !== undefined ? message.ph : "--"}
          </motion.span>
        </Card>
        <Card>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex flex-col items-center justify-center gap-2"
          >
            <WaterDrop />
            <span className="text-xs break-all">Nível</span>
          </motion.div>
          <motion.div
            initial={motionProperties.initial}
            animate={motionProperties.animate}
            transition={motionProperties.transition}
            className="flex items-start justify-center"
          >
            <span className="text-4xl break-all">
              {message.nivel !== undefined ? message.nivel : "--"}
            </span>
            <span className="text-xs">%</span>
          </motion.div>
        </Card>
      </div>
      <div className="grid-cols-1  grid-rows-chartMobileCaixa lg:grid-cols-2 grid lg:grid-rows-3 lg:w-full lg:h-[77vw] xl:h-[52vw] gap-9">
        <LineChart name="Chart 1" />
        <LineChart name="Chart 2" />
        <LineChart name="Chart 3" />
        <LineChart name="Chart 4" />
        <LineChart name="Chart 5" />
      </div>
    </div>
  );
}

export default CaixaAllDashboardSection;
