import { AnimatePresence, motion } from "motion/react";
import { useCalendar } from "../../contexts";
import { weekDirectionVariants } from "../../utils";
import { PropsWithChildren } from "react";

function WeekChangeScrollAnimation({ children }: PropsWithChildren<any>) {
  const { weekDirection, weekStart } = useCalendar();

  return (
    <AnimatePresence mode="wait" custom={weekDirection}>
      <motion.div
        key={weekStart.toISOString()}
        custom={weekDirection}
        variants={weekDirectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          type: "tween",
          duration: 0.25,
        }}
        className="h-full w-full">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default WeekChangeScrollAnimation;
