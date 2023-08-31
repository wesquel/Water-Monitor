import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

function MeunuHamburguer({ children, showModal, setShowModal }) {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal && windowSize[0] > 1024) {
      setShowModal(false);
    }
  }, [windowSize]);
  return (
    <>
      <motion.div
        whileTap={{ scale: 0.7 }}
        className="flex gap-1 justify-between flex-col mx-2 mt-8 mb-9 lg:hidden cursor-pointer relative h-8 w-12 z-40"
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <div
          className={twMerge(
            "w-10 h-[3px] bg-mainWhite transition-transform duration-200",
            showModal && "rotate-45 absolute bottom-4"
          )}
        />
        <div
          className={twMerge(
            "w-10 h-[3px] bg-mainWhite",
            showModal && "opacity-0"
          )}
        />
        <div
          className={twMerge(
            "w-10 h-[3px] bg-mainWhite transition-transform duration-200",
            showModal && "-rotate-45 absolute bottom-4"
          )}
        />
      </motion.div>
      <div
        className={twMerge(
          "hidden lg:flex",
          showModal &&
            "flex absolute w-full h-full top-0 bg-secondBlack z-20 justify-center"
        )}
      >
        {children}
      </div>
    </>
  );
}
export default MeunuHamburguer;
