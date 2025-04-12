import { Event as EventType } from "../data/demo";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

function Event({ id, title, description, imageUrl, time }: EventType) {
  return (
    <motion.div
      id={id}
      layoutId={`event-container-${id}`}
      className="group relative flex flex-col shadow-sm rounded-xl overflow-hidden cursor-pointer">
      <motion.div layout layoutId={`event-image-container-${id}`}>
        <img
          src={imageUrl}
          alt={title}
          className="rounded w-full h-32 object-cover duration-300 group-hover:scale-105"
        />
      </motion.div>
      <motion.div
        layoutId={`info-container-${id}`}
        layout="position"
        className="p-2 text-left">
        <h1 className="!text-base font-semibold line-clamp-1">{title}</h1>
        <p className="!text-xs text-gray-500 line-clamp-2">{description}</p>
        <p className="!text-sm mt-3 line-clamp-1">{time}</p>
      </motion.div>

      <Link to={id} className="absolute inset-0" />
    </motion.div>
  );
}

export default Event;
