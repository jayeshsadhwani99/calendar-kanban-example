function DropIndicator({ beforeId, day }: any) {
  return (
    <div
      data-day={day}
      data-before={beforeId ?? "-1"}
      className="my-0.5 h-2 w-full rounded-full bg-gray-300 opacity-0"
    />
  );
}

export default DropIndicator;
