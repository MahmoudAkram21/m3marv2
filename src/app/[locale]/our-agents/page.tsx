import Image from "next/image";
import { getSiteData } from "../../../../lib/SiteDataAPI";

import Agents from "../../../components/Agents";

export default async function OurAgents() {
  let activeSiteData = await getSiteData();
  return (
    <main className="w-full">
      <section className="relative w-full flex flex-col justify-center min-h-[90vh] md:min-h-[85vh] overflow-hidden ">
        {activeSiteData && activeSiteData.agents_page_hero_image && (
          <Image
            src={activeSiteData.agents_page_hero_image}
            alt="Hero Image"
            priority
            fill
            className=" object-cover"
          />
        )}
        <div className="flex items-center justify-center w-full">
          <div className="text-center sm:max-w-screen md:max-w-screen-xl px-4 mx-auto p-4 rounded-lg w-full bg-white">
            <h1 className="text-xl md:text-4xl xl:text-[40px] font-bold mb-4 drop-shadow-lg text-white w-full ">
              {activeSiteData?.agents_page_hero_title}
            </h1>
            <p className="text-lg md:text-xl 2xl:text-[22px] drop-shadow-sm text-white">
              {activeSiteData?.agents_page_hero_description}
            </p>
          </div>
        </div>
      </section>

      {/* قابل وكلائنا */}
      <section className="my-12 mx-4 md:mx-10 lg:mx-25 md:my-25">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-col items-center md:flex-row md:items-baseline justify-between mb-8 ">
            <div className="flex flex-col items-center md:items-center justify-center   rounded-lg w-full bg-[var(--main-color)] p-4">
              <h2 className="text-xl sm:text-2xl md:text-2xl  xl:text-[30px] 2xl:text-[36px] font-600 text-white mb-4 text-center ">
                {activeSiteData?.agents_section_title}
              </h2>
              <p className="text-white mb-6 text-center text-[12px] sm:text-md md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                {activeSiteData?.agents_section_description}
              </p>
            </div>
          </div>
          <Agents unitsPerSlide={3} limit={1000} />
        </div>
      </section>
    </main>
  );
}
