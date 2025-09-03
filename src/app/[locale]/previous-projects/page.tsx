import Image from "next/image";
import NewProject from "../../../components/NewProject";

import { previousUnits } from "../../../data/previousunit";
import { getSiteData, SiteData } from "../../../../lib/SiteDataAPI";
import { getLocale } from "next-intl/server";

export default async function OurProjects() {
  const locale = await getLocale();
  const activeSiteData = await getSiteData(locale);
  return (
    <main className="w-full">
      {/* Header*/}{" "}
      <section className="relative w-full flex flex-col justify-center min-h-[90vh] md:min-h-[85vh] overflow-hidden ">
        {activeSiteData && activeSiteData.prev_projects_page_hero_image && (
          <Image
            src={activeSiteData.prev_projects_page_hero_image}
            alt="Hero Image"
            fill
            className=" object-cover"
          />
        )}
        <div className="flex items-center justify-center w-full">
          <div className="text-center w-full sm:max-w-screen md:max-w-screen-xl px-4 mx-auto">
            <h1 className="text-xl md:text-4xl xl:text-[40px] font-bold mb-4 drop-shadow-lg text-white">
              {activeSiteData?.prev_projects_page_hero_title}
            </h1>
            <p className="text-lg md:text-xl  drop-shadow-sm text-white">
              {activeSiteData?.prev_projects_page_hero_description}
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 flex flex-col gap-3 mx-4 md:mx-8 lg:mx-25 bg-white">
        <div className="flex flex-col gap-2 text-START">
          <h1 className="text-[20px] sm:text-[24px] md:text-[28px] xl:text-[32px] text-[#333333] font-600 ">
            {activeSiteData?.prev_projects_page_projects_title}
          </h1>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#626262] font-light">
            {activeSiteData?.prev_projects_page_projects_description}
          </p>
        </div>

        <NewProject
          units={previousUnits}
          prevProjects={true}
          unitsPerSlide={9}
        />
      </section>
    </main>
  );
}
