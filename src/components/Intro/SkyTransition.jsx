import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SkyTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });


  const topColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#0b132b", "#87ceeb"] 
  );
  const bottomColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#1c2541", "#ffd6a5"] 
  );


  const starOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.5, 0]);

  return (
    <div ref={ref} className="relative h-[200vh] w-full overflow-hidden">
      {/* Gradient Sky */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full transition-colors duration-1000"
        style={{
          background: `linear-gradient(to bottom, ${topColor.get()}, ${bottomColor.get()})`,
        }}
      />

      {/* Animate gradient dynamically */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 1],
            [
              "linear-gradient(to bottom, #0b132b, #1c2541)",
              "linear-gradient(to bottom, #87ceeb, #ffd6a5)",
            ]
          ),
        }}
      />

      {/* Star Layer */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ opacity: starOpacity }}
      >
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
            }}
          />
        ))}
      </motion.div>

      {/* Horizon glow for subtle realism */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[40vh] blur-[100px]"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 1],
            ["rgba(255, 160, 122, 0)", "rgba(255, 200, 150, 0.6)"]
          ),
        }}
      />
    </div>
  );
}
