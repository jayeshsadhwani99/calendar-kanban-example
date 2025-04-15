import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { findEventById } from "../utils";

type EventDetailsProps = {
  id: string;
};

function EventDetails({ id }: EventDetailsProps) {
  const event = findEventById(id);

  if (!event) return;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        style={{ pointerEvents: "auto" }}
        className="bg-black fixed top-0 left-0 w-screen h-dvh opacity-50 z-10">
        <Link to="/" className="top-0 left-0 right-0 bottom-0 absolute" />
      </motion.div>
      <div>
        <motion.div
          className="fixed overflow-hidden top-0 left-0 right-0 bottom-0 md:max-w-xs lg:max-w-md md:h-fit z-20 m-auto bg-white rounded-2xl"
          layoutId={`event-container-${id}`}
          transition={{ duration: 0.2, delay: 0.1 }}>
          <motion.div layout layoutId={`event-image-container-${id}`}>
            <img
              className="h-64 w-full select-none"
              src={event.imageUrl}
              alt=""
            />
            <Link to="/" className="absolute top-0 right-0 p-4 text-white">
              X
            </Link>
          </motion.div>
          <motion.div
            layoutId={`info-container-${id}`}
            layout="position"
            className="p-2 text-left">
            <h1 className="!text-base font-semibold">{event.title}</h1>
            <p className="!text-xs text-gray-500">{event.description}</p>
            <p className="!text-sm mt-3">{event.time}</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default EventDetails;
