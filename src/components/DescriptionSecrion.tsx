import React from "react";

function DescriptionSecrion({
  description,
  title,
  className,
  headerClassName,
}: {
  description: string;
  title: string;
  className?: string;
  headerClassName?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-start gap-3 shadow-[var(--shadow)] p-2 md:p-3 lg:p-5  rounded-2xl w-full ${className}`}
    >
      <h1
        className={`text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[28px] text-white font-bold text-center bg-[var(--main-color)] p-5 rounded-2xl ${headerClassName}`}
      >
        {title}
      </h1>

      <p
        className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[28px] text-[var(--main-color)] font-light text-start  "
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </div>
  );
}

export default DescriptionSecrion;
