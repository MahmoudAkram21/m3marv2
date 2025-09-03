import Image from "next/image";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { getNewsItem } from "../../../../../lib/NewsItem";
import Link from "next/link";
import DescriptionSecrion from "@/components/DescriptionSecrion";
import { getTranslations } from "next-intl/server";

export default async function OurProjects({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const t = await getTranslations();
  const newsItem = await getNewsItem(id);
  console.log("newsItem", newsItem);
  return (
    <main className="w-full">
      <section className="relative w-full flex flex-col justify-center min-h-[90vh] md:min-h-[75vh] overflow-hidden ">
        {newsItem && newsItem.img && (
          <Image
            src={`${newsItem.img}`}
            alt="Hero Image"
            fill
            className=" object-cover"
          />
        )}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 rounded-lg  bg-black/50 backdrop-blur-sm flex justify-center items-center ">
          {newsItem && newsItem.title && (
            <h1 className="text-[18px] sm:text-[24px] md:text-[28px] xl:text-[32px] font-bold text-white">
              {newsItem.title}
            </h1>
          )}
        </div>
      </section>

      <section className="py-2   bg-[var(--main-color)] w-full">
        <div className="flex flex-row-reverse  justify-end items-start gap-2  mx-4 md:mx-8 lg:mx-25 mt-5 mb-4">
          <Link
            href="/news"
            className="text-[12px] sm:text-[14px] md:text-[16px] text-white font-semibold"
          >
            {t("common.news")}
          </Link>
          <MdOutlineKeyboardArrowLeft className="text-[18px] text-white self-center " />
          <div className="flex justify-around gap-5">
            <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] text-white">
              {newsItem && newsItem.date}
            </p>
          </div>
        </div>
      </section>

      <section className="py-2 px-4 md:px-8 bg-white mb-4">
        <DescriptionSecrion
          description={newsItem?.content ?? ""}
          title={newsItem?.title ?? ""}
        />
      </section>
    </main>
  );
}
