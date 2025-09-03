"use client";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { getAllDepartments, Department } from "../../lib/Departments";
import { getSiteData, SiteData } from "../../lib/SiteDataAPI";
import { useLocale, useTranslations } from "next-intl";

export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [activeSiteData, setActiveSiteData] = useState<SiteData | null>(null);
  const [openLanguageDropdown, setOpenLanguageDropdown] =
    useState<boolean>(false);

  function toggleDropdown() {
    setOpenDropdown((prev) => !prev);
  }
  const locale = useLocale();
  useEffect(() => {
    getAllDepartments(locale).then(setDepartments);
    getSiteData(locale).then(setActiveSiteData);
  }, [locale]);

  const segments = pathname.split("/");

  let pathWithoutLocale = pathname;
  pathWithoutLocale = "/" + segments.slice(2).join("/");

  const t = useTranslations("navBar");
  return (
    <>
      <nav ref={navRef} className="w-full shadow-md">
        {/* Top NavBar */}
        <div className="hidden sm:flex sm:px-2  md:px-8 lg:px-25  bg-[var(--main-color)] text-white py-5 px-15  flex-row justify-between ">
          <div className="flex flex-row items-center gap-4 ">
            <p className="sm:text-xs md:text-[18px] md:font-medium   ">
              {t("contactUs")}{" "}
            </p>
            <div className="border-2 sm:w-14 md:w-15 border-white"></div>
            {activeSiteData && activeSiteData.email && (
              <div className="flex flex-row-reverse items-center gap-2">
                <a
                  href={`mailto:${activeSiteData?.email}`}
                  className="font-light sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]  "
                >
                  {activeSiteData?.email}
                </a>
                <FiMail className="mt-0.5" size={20} />
              </div>
            )}

            {activeSiteData && activeSiteData.phone && (
              <div className="flex flex-row-reverse items-center gap-2">
                <p className="font-light sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]   mt-1">
                  <a href={`tel:${activeSiteData?.phone}`}>
                    {activeSiteData?.phone}
                  </a>
                </p>
                <BsTelephone className="mt-0.5" size={20} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
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

        {/* Bottom NavBar */}
        <div className="bg-white shadow-sm relative px-2 md:px-8  lg:px-25 flex flex-col justify-center transition-all duration-300 ease-in-out">
          <div className="flex flex-row justify-between items-center h-16">
            <div className="flex sm:hidden flex-row gap-4 items-center justify-between w-full">
              <Link
                href="/"
                className=" items-center w-[100px] h-[100px] relative block"
              >
                <Image
                  src="/welcomeLogoColor.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>
              <button
                className="sm:hidden text-[#2A256D]"
                onClick={() => setSidebarOpen(true)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <ul className=" hidden sm:flex flex-row justify-center items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-6 text-gray-800 ">
              {activeSiteData && activeSiteData.header_logo && (
                <li>
                  <Link href="" className="flex items-center">
                    <Image
                      width={50}
                      height={50}
                      src={activeSiteData.header_logo}
                      alt="Logo"
                    />
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/"
                  className={`transition-all text-[9px] sm:text-[10px] md:text-[12px]  xl:text-[18px] 2xl:text-[22px]  duration-200 relative p-3 linke-event ${
                    pathname === `/${locale}` ? "active" : ""
                  }`}
                >
                  {t("homePage")}
                </Link>
              </li>

              <li className="cursor-pointer flex items-center gap-1 relative">
                <div
                  onClick={() => toggleDropdown()}
                  className={`focus:outline-none cursor-pointer flex items-center gap-1 text-[9px] sm:text-[10px] mt-0.5 sm:mt-0 md:text-[12px]   xl:text-[18px] 2xl:text-[22px]  font-[400]   transition-all duration-200 link ${
                    openDropdown ? "active" : ""
                  }`}
                >
                  {t("companyDepartments")}
                  <IoIosArrowForward
                    className={`transition-transform duration-300 rotate-180 ${
                      openDropdown ? "rotate-90" : ""
                    }`}
                    size={15}
                    onClick={() => toggleDropdown()}
                  />
                  <div
                    className={`absolute top-10 -left-20 w-fit h-fit bg-white z-50 rounded-md shadow-md transition-all duration-300 ${
                      openDropdown ? "scale-100" : "scale-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-4 p-4 text-right text-gray-800 text-sm">
                      {departments &&
                        departments.map((department) => (
                          <li
                            key={department.id}
                            className="p-3 hover:bg-[#F3F3F3] cursor-pointer"
                          >
                            <Link href={`/department/${department.id}`}>
                              {department.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </li>

              <li className="cursor-pointer flex items-center gap-1">
                <Link
                  href="/our-projects"
                  className={`transition-all text-[9px] sm:text-[10px] md:text-[12px]  xl:text-[18px] 2xl:text-[22px]  duration-200 relative p-3 linke-event ${
                    pathname === `/${locale}/our-projects` ? "active" : ""
                  }`}
                >
                  {t("ourProjects")}
                </Link>
              </li>

              <li>
                <Link
                  href="/previous-projects"
                  className={`transition-all text-[9px] sm:text-[10px] md:text-[12px]  xl:text-[18px] 2xl:text-[22px]  duration-200 relative p-3 linke-event ${
                    pathname === `/${locale}/previous-projects` ? "active" : ""
                  }`}
                >
                  {t("previousProjects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={`transition-all text-[9px] sm:text-[10px] md:text-[12px]  xl:text-[18px] 2xl:text-[22px]  duration-200 relative p-3 linke-event ${
                    pathname === `/${locale}/about-us` ? "active" : ""
                  }`}
                >
                  {t("aboutPage")}
                </Link>
              </li>

              <li>
                <Link
                  href="/news"
                  className={`transition-all text-[9px] sm:text-[10px] md:text-[12px]  xl:text-[18px] 2xl:text-[22px]  duration-200 relative p-3 linke-event ${
                    pathname === `/${locale}/news` ? "active" : ""
                  }`}
                >
                  {t("news")}
                </Link>
              </li>

              <li>
                <Link
                  href="/contactus"
                  className={`transition-all text-[9px] sm:text-[10px] md:text-[12px]  xl:text-[18px] 2xl:text-[22px]  duration-200 relative p-3 linke-event ${
                    pathname === `/${locale}/contactus` ? "active" : ""
                  }`}
                >
                  {t("contactPage")}
                </Link>
              </li>

              <li>
                <Link
                  href="/jobs"
                  className={`transition-all text-[9px] sm:text-[10px] md:text-[12px]  xl:text-[18px] 2xl:text-[22px]  duration-200 relative p-3 linke-event ${
                    pathname === `/${locale}/jobs` ? "active" : ""
                  }`}
                >
                  {t("jobs")}
                </Link>
              </li>
            </ul>

            <div className="flex flex-row-reverse items-center  gap-4 relative">
              <div
                className="hidden sm:flex flex-row-reverse justify-between gap-2 rounded-full p-1 xl:p-3 bg-[#F3F3F3] items-center relative cursor-pointer"
                onClick={() => setOpenLanguageDropdown(!openLanguageDropdown)}
              >
                <Image
                  width={20}
                  height={20}
                  color="black"
                  src="/translate.svg"
                  alt=""
                />
                <p className="text-[10px] md:text-[12px]  xl:text-[14px] text-[#333333] ">
                  {t("switchLanguage")}
                </p>
              </div>
              <div
                className={`absolute top-10 -left-10 w-full h-fit bg-white z-50 rounded-md shadow-md transition-all duration-300 ${
                  openLanguageDropdown ? "scale-100" : "scale-0"
                }`}
              >
                <ul className="flex flex-col gap-4 p-4 text-right text-gray-800 text-sm">
                  <li>
                    <NextLink href={`/ar${pathWithoutLocale}`}>
                      {t("arabic")}
                    </NextLink>
                  </li>
                  <li>
                    <NextLink href={`/en${pathWithoutLocale}`}>
                      {t("english")}
                    </NextLink>
                  </li>
                </ul>
              </div>
              {/* <div className="rounded-full p-1 xl:p-3  bg-[#F3F3F3]">
                <FaRegBell size={18} />
              </div> */}
            </div>
          </div>
          {/* Sidebar overlay */}
          <div
            className={`fixed inset-0 z-50 bg-[#1a1a1a8a] bg-opacity-50 transition-opacity ${
              sidebarOpen ? "block" : "hidden"
            }`}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar itself */}
          <div
            className={`fixed right-0 top-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <span className="font-bold text-[#2A256D]">{t("menu")}</span>
              <button onClick={() => setSidebarOpen(false)}>✖</button>
            </div>

            <ul className="flex flex-col gap-4 p-4 text-right text-gray-800 text-sm">
              <li>
                <Link
                  className={`transition-all duration-200  ${
                    pathname === "/"
                      ? "text-[#383191] border-r-2 border-[#E37C35]"
                      : ""
                  }`}
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t("homePage")}
                </Link>
              </li>
              <li>
                <Link
                  className={`transition-all duration-200  ${
                    pathname === "/previous-projects"
                      ? "text-[#383191] border-r-2 border-[#E37C35]"
                      : ""
                  }`}
                  href="/previous-projects"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t("previousProjects")}
                </Link>
              </li>
              <li>
                <Link
                  className={`transition-all duration-200  ${
                    pathname === "/about-us"
                      ? "text-[#383191] border-r-2 border-[#E37C35]"
                      : ""
                  }`}
                  href="/about-us"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t("aboutPage")}
                </Link>
              </li>
              <li>
                <Link
                  className={`transition-all duration-200  ${
                    pathname === "/news"
                      ? "text-[#383191] border-r-2 border-[#E37C35]"
                      : ""
                  }`}
                  href="/news"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link
                  className={`transition-all duration-200  ${
                    pathname === "/contactus"
                      ? "text-[#383191] border-r-2 border-[#E37C35]"
                      : ""
                  }`}
                  href="/contactus"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t("contactPage")}
                </Link>
              </li>
              <li>
                <Link
                  className={`transition-all duration-200  ${
                    pathname === "/jobs"
                      ? "text-[#383191] border-r-2 border-[#E37C35]"
                      : ""
                  }`}
                  href="/jobs"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t("jobs")}
                </Link>
              </li>
              <li className="mt-2 font-bold text-[#2A256D]">
                {t("companyDepartments")}
              </li>
              {departments &&
                departments.map((department) => (
                  <li key={department.id} className="pl-2 ">
                    {" "}
                    <Link
                      className={`transition-all duration-200  ${
                        pathname === "/department/" + department.id
                          ? "text-[#383191] border-r-2 border-[#E37C35]"
                          : ""
                      }`}
                      href={`/department/${department.id}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {department.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  className={`transition-all duration-200  ${
                    pathname === "/jobs"
                      ? "text-[#383191] border-r-2 border-[#E37C35]"
                      : ""
                  }`}
                  href="/previous-projects"
                  onClick={() => setSidebarOpen(false)}
                >
                  {t("ourProjects")}
                </Link>
              </li>
              <div
                className={`w-full h-fit bg-white z-50 rounded-md shadow-md transition-all duration-300 flex flex-col gap-4 p-4 text-right text-gray-800 text-sm`}
              >
                <li>
                  <NextLink href={`/ar${pathWithoutLocale}`}>
                    {t("arabic")}
                  </NextLink>
                </li>
                <li>
                  <NextLink href={`/en${pathWithoutLocale}`}>
                    {t("english")}
                  </NextLink>
                </li>
              </div>
            </ul>
          </div>

          {/* منطقة القوائم المنسدلة - داخل التمدد */}
        </div>
      </nav>
    </>
  );
}
