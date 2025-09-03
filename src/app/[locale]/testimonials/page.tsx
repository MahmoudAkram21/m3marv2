import Image from "next/image";
import { getSiteData } from "../../../../lib/SiteDataAPI";

import CustomerOpinions from "@/components/CustomerOpinions";
import { BASE_URL } from "../../../../lib/config";

export default async function OurTestimonials() {
  let activeSiteData = await getSiteData();

  return (
    <main className="w-full">
      {/* Header*/}

      <section className="relative w-full flex flex-col justify-center min-h-[90vh] md:min-h-[85vh] overflow-hidden ">
        {activeSiteData && activeSiteData.testimonials_page_hero_image && (
          <Image
            src={
              BASE_URL +
              "/storage/" +
              activeSiteData.testimonials_page_hero_image
            }
            alt="Hero Image"
            fill
            className=" object-cover"
          />
        )}
        <div className="flex items-center justify-center w-full">
          <div className="text-center w-full sm:max-w-screen md:max-w-screen-xl px-4 mx-auto">
            <h1 className="text-xl md:text-4xl xl:text-[40px] font-bold mb-4 drop-shadow-lg text-white">
              {activeSiteData?.testimonials_page_hero_title}
            </h1>
            <p className="text-lg md:text-xl 2xl:text-[22px] drop-shadow-sm text-white">
              {activeSiteData?.testimonials_page_hero_description}
            </p>
          </div>
        </div>
      </section>

      <CustomerOpinions homePage={false} limit={1000} />
    </main>
  );
}
