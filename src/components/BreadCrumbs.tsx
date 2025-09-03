import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

function BreadCrumbs({ title, link }: { title: string; link: string }) {
  return (
    <div className="flex flex-row w-full justify-center items-center gap-2  px-4 md:px-8  mb-8 bg-[var(--main-color)] p-6">
      <p className="text-[12px] sm:text-[14px] md:text-[16px] text-white font-semibold">
        {link}
      </p>
      <MdOutlineKeyboardArrowLeft className="text-[18px] text-white self-center " />
      <p className="text-[12px] sm:text-[14px] md:text-[16px] text-white font-semibold">
        {title}
      </p>
    </div>
  );
}

export default BreadCrumbs;
