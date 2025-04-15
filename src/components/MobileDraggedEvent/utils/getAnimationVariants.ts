export const getAnimationVariants = (coordinates: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => ({
  initial: { opacity: 0.5, scale: 0.8, z: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    z: 20,
  },
  exit: {
    opacity: 0.5,
    left: coordinates.x + coordinates.width / 2,
    top: coordinates.y + coordinates.height / 2,
  },
});
