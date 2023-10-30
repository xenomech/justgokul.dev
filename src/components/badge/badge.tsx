export const Badge = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  return (
    <div
      className={`rounded-md border-[1px] border-black border-opacity-40 px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {text}
    </div>
  );
};
