import { Link } from "@/i18n/navigation";
import React from "react";

function SectionHeader({
  title,
  description,
  link,
  children,
}: {
  title: string;
  description: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex  items-baseline justify-between  w-full">
      <div className="flex flex-col  items-start text-start   rounded-lg ">
        <h2 className=" text-lg sm:text-2xl md:text-[28px] xl:text-32px font-600 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 mb-6 text-start text-[12px] sm:text-md md:text-[18px] 2xl:text-[22px] max-w-[80ch]">
          {description}
        </p>
      </div>
      <Link
        href={link}
        className="block w-fit px-4 py-3  border-[#E37C35] border-[1px] text-[#E37C35] text-[9px] sm:text-[12px] md:text-[14px] xl:text-[18px] rounded-4xl hover:bg-[#E37C35] hover:text-white transition duration-200"
      >
        {children}
      </Link>
    </div>
  );
}

export default SectionHeader;
