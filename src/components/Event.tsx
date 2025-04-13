import { Event as EventType } from "../data/demo";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import DropIndicator from "./DropIndicator";
import { formatDate } from "../utils";

function Event(props: EventType & { date: Date; handleDragStart: any }) {
  const { id, title, description, imageUrl, time, date, handleDragStart } =
    props;

  return (
    <Link to={`/${id}`}>
      <DropIndicator day={formatDate(date)} />
      <motion.div
        id={id}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, id, date)}
        layoutId={`event-container-${id}`}
        className="group relative flex flex-col shadow-sm rounded-xl overflow-hidden cursor-pointer active:cursor-grabbing">
        <motion.div layout layoutId={`event-image-container-${id}`}>
          <img
            src={imageUrl}
            draggable={false}
            alt={title}
            className="rounded w-full h-32 object-cover group-hover:scale-105 transition-transform"
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
      </motion.div>
      <DropIndicator day={formatDate(date)} />
    </Link>
  );
}

export default Event;
