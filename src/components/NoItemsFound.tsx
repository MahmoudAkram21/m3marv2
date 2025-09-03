import Image from "next/image";

export default function NoItemsFound({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 h-[50vh] ${className}`}
    >
      <div className=" w-full h-full relative">
        <Image
          src="/notItemsFound.jpg"
          alt={title}
          className="w-full h-full object-cover rounded-2xl"
          priority
          fill
        />
      </div>
      <h1 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-black">
        {title}
      </h1>
    </div>
  );
}
