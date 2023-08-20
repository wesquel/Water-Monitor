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
function CaixaAllDashboardSection() {
  return (
    <div className="p-2 w-full min-h-screen lg:px-20 lg:py-14 xl:px-28 flex flex-col justify-center">
      <div className="grid gap-9 mb-9 lg:grid-cols-4 lg:grid-rows-1 grid-cols-1 grid-rows-2 items-center">
        <p className="lg:col-span-3 text-mainWhite">
          Última atualização: xx/xx/xxxx 99:99
        </p>
        <ChangeFilterDateButton />
      </div>
      <div className="grid gap-9 mb-9 lg:grid-cols-5 lg:grid-rows-1 grid-cols-1 grid-rows-5">
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Thermometer />
            <span className="text-xs break-all">Temperatura</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex  items-start justify-center"
          >
            <span className="text-4xl break-all">
              <CountUp end={26} />
            </span>
            <span className="text-xs">°C</span>
          </motion.div>
        </Card>
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Turbidity className="w-12 h-12" />
            <span className="text-xs break-all">Turbidez</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex  items-start justify-center"
          >
            <span className="text-4xl break-all">
              <CountUp end={20} />
            </span>
            <span className="text-xs">NTU</span>
          </motion.div>
        </Card>
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Bolt />
            <span className="text-xs break-all">Condutividade</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-center"
          >
            <span className="text-4xl break-all">
              <CountUp end={100} />
            </span>
            <span className="text-xs">μS/cm</span>
          </motion.div>
        </Card>
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <img src={Ph} className="w-12 invert p-1" />
            <span className="text-xs break-all">pH</span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl break-all flex items-center justify-center"
          >
            <CountUp end={7} />
          </motion.span>
        </Card>
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <WaterDrop />
            <span className="text-xs break-all">Nível</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-center"
          >
            <span className="text-4xl break-all">
              <CountUp end={80} />
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
