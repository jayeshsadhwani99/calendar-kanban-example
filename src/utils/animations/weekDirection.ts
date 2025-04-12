// Define animation variants based on the weekDirection.
// If weekDirection > 0 (next week), the new week enters from the left and exits to the right.
// If weekDirection < 0 (previous week), the new week enters from the right and exits to the left.
export const getWeekDirectionVariants = (direction: number) => ({
  initial: {
    x: direction > 0 ? "100%" : "-100%",
  },
  animate: {
    x: 0,
  },
  exit: {
    x: direction > 0 ? "-100%" : direction === 0 ? "-100%" : "100%",
  },
});
