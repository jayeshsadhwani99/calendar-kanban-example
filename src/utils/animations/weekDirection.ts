// Define animation variants based on the weekDirection.
// If weekDirection > 0 (next week), the new week enters from the left and exits to the right.
// If weekDirection < 0 (previous week), the new week enters from the right and exits to the left.
export const weekDirectionVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
  animate: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
};
