import Image from "next/image";
import { FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getSiteData } from "../../lib/SiteDataAPI";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
const Footer = async () => {
  const locale = await getLocale();
  const t = await getTranslations();
  let activeSiteData = await getSiteData(locale);
  return (
    <footer
      className="flex flex-col justify-center gap-3"
      style={{
        background: "url('/FooterBg.svg')",
        backgroundSize: "cover",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="flex flex-row p-6 justify-center items-center rounded-full border-3 border-[var(--secondary-color)] bg-white">
          <div className="w-[150px] h-[150px] relative ">
            {activeSiteData && activeSiteData.footer_logo && (
              <Image
                alt="logo"
                src={activeSiteData.footer_logo}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="text-[14px] sm:text-[16px] 2xl:text-[22px] font-bold text-white">
            {t("common.headOffice")}
          </p>
          <div className="flex flex-row-reverse gap-2">
            <div className="text-white text-[12px] sm:text-[14px] 2xl:text-[20px]">
              {activeSiteData && activeSiteData.address_link ? (
                <Link href={activeSiteData.address_link} target="_blank">
                  {activeSiteData && activeSiteData.address && (
                    <div
                      style={{ textAlign: "right" }}
                      dangerouslySetInnerHTML={{
                        __html: activeSiteData?.address.replaceAll(
                          "\n",
                          "<br/>"
                        ),
                      }}
                    />
                  )}
                </Link>
              ) : (
                <div>
                  {activeSiteData && activeSiteData.address && (
                    <div
                      style={{ textAlign: "right" }}
                      dangerouslySetInnerHTML={{
                        __html: activeSiteData?.address.replaceAll(
                          "\n",
                          "<br/>"
                        ),
                      }}
                    />
                  )}
                </div>
              )}
            </div>

            <FaLocationDot className="text-white text-[14px] sm:text-[16px] 2xl:text-[22px]" />
          </div>
          <p className="text-white font-semibold text-[12px] sm:text-[14px] 2xl:text-[20px]">
            {t("common.contactUs")}
          </p>

          <div className="flex flex-row justify-center gap-3">
            <div className="flex flex-row gap-1">
              <p className="text-white text-[10px] sm:text-[12px] 2xl:text-[20px]">
                {activeSiteData?.phone}
              </p>
              <BsTelephone className="text-white text-[14px] sm:text-[16px] 2xl:text-[22px]" />
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-white text-[10px] sm:text-[12px] 2xl:text-[20px]">
                {activeSiteData?.email}
              </p>
              <FiMail className="text-white text-[14px] sm:text-[16px] 2xl:text-[22px] " />
            </div>
          </div>

          <p className="text-white text-[12px] sm:text-[14px] font-semibold"></p>
          <div className="flex self-center gap-2 md:gap-4">
            {activeSiteData && activeSiteData.fb_link && (
              <Link href={activeSiteData.fb_link} target="_blank">
                <div className="rounded-full bg-white p-1">
                  <FaFacebookF
                    color="#2A256D"
                    className="md:w-5 md:h-5 w-5 h-5 xl:w-[24px] xl:h-[24px]"
                  />
                </div>
              </Link>
            )}
            {activeSiteData && activeSiteData.instagram_link && (
              <Link href={activeSiteData.instagram_link} target="_blank">
                <div className="rounded-full bg-white p-1">
                  <FaInstagram
                    color="#2A256D"
                    className="md:w-5 md:h-5 w-5 h-5 xl:w-[24px] xl:h-[24px]"
                  />
                </div>
              </Link>
            )}
            {activeSiteData && activeSiteData.youtube_link && (
              <Link href={activeSiteData.youtube_link} target="_blank">
                <div className="rounded-full bg-white p-1">
                  <FaYoutube
                    color="#2A256D"
                    className="md:w-5 md:h-5 w-5 h-5 xl:w-[24px] xl:h-[24px]"
                  />
                </div>
              </Link>
            )}
            {activeSiteData && activeSiteData.x_link && (
              <Link href={activeSiteData.x_link} target="_blank">
                <div className="rounded-full bg-white p-1">
                  <FaXTwitter
                    color="#2A256D"
                    className="md:w-5 md:h-5 w-5 h-5 xl:w-[24px] xl:h-[24px]"
                  />
                </div>
              </Link>
            )}
            {activeSiteData && activeSiteData.linkedin_link && (
              <Link href={activeSiteData.linkedin_link} target="_blank">
                <div className="rounded-full bg-white p-1">
                  <FaLinkedinIn
                    color="#2A256D"
                    className="md:w-5 md:h-5 w-5 h-5 xl:w-[24px] xl:h-[24px]"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
        <div>
          <p className="text-white text-[12px] sm:text-[14px] 2xl:text-[22px]">
            {t("common.allRightsReserved")} |
            <Link
              href="https://qeematech.net"
              className="text-[#E37C35]"
              target="_blank"
            >
              {t("common.qeematech")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
