import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageImporterCarousel = ({ imgs, autoPlayMilliseconds = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {

    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, autoPlayMilliseconds);
    return () => clearInterval(intervalId);
  }, [imgs.length, autoPlayMilliseconds]);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.4,
          delay: 0.0,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        key={activeIndex}
      >
        <img
          src={imgs?.[activeIndex]?.src}
          alt={`Image ${activeIndex}`}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageImporterCarousel;