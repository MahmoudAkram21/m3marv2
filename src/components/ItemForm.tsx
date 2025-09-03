"use client";
import React, { useState } from "react";
import { CiMail, CiPhone, CiUser } from "react-icons/ci";
import PhoneInput from "react-phone-input-2";
import { reserveMessage } from "../../actions/posts";
import "react-phone-input-2/lib/style.css";
import { useTranslations } from "next-intl";
import Form from "./Form";

function ItemForm({ itemId }: { itemId: number | null }) {
  const t = useTranslations();

  const [activeTab, setActiveTab] = useState<string>("contact");
  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex flex-row-reverse justify-start gap-2 mb-4 border-b-1 border-[#817777] w-full pb-2">
        <button
          onClick={() => handleClick("contact")}
          className={`rounded-3xl cursor-pointer p-2 transition-colors duration-200 ${
            activeTab === "contact"
              ? "bg-[#FCF2EB] text-[#E37C35]"
              : "bg-transparent text-black"
          }`}
        >
          {t("common.contactUs")}
        </button>

        <button
          onClick={() => handleClick("complaint")}
          className={`rounded-3xl p-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "complaint"
              ? "bg-[#FCF2EB] text-[#E37C35]"
              : "bg-transparent text-black"
          }`}
        >
          {t("common.complaint")}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 text-start w-full mb-4 rounded-2xl px-4 sm:px-[30px] md:px-[40px] py-4">
        <Form
          serverAction={reserveMessage}
          className="w-full border-2 border-[#C3C3C3] rounded-2xl p-2"
        >
          <div className="flex flex-col justify-start  gap-2 mb-4">
            <h2 className="text-[18px] sm:text-[20px] md:text-[22px] xl:text-[32px] 2xl:text-[34px] font-600 text-[#333333]">
              {activeTab === "contact"
                ? t("common.contactUs")
                : t("common.complaint")}{" "}
            </h2>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#4C4C4C] font-400">
              {t("form.contactDescription")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-start w-full mb-4 relative">
            <div className="flex justify-start  gap-2 border-2 border-[#C3C3C3] rounded-2xl w-full  relative">
              <input
                className="text-start 2xl:text-[20px] p-2 w-full outline-none"
                type="text"
                placeholder={t("form.fullName")}
                name="name"
              />
              <CiUser className="text-[#333333] text-[20px] sm:text-[22px] md:text-[24px] self-center absolute left-2" />
            </div>
            <div className="flex flex-row gap-2 border-2 border-[#C3C3C3] rounded-2xl w-full  relative">
              {/* <PhoneInput
              inputStyle={{
                width: "100%",
                border: "none",
                outline: "none",
                textAlign: "start",
                fontSize: "18px",
                fontFamily: "alexandria, sans-serif",
                padding: "10px",
                }}
              containerStyle={{
                width: "100%",
                border: "none",
                outline: "none",
                textAlign: "start",
                fontSize: "18px",
                fontFamily: "alexandria, sans-serif",
                padding: "10px",
                }}
                country={"eg"}
                enableSearch
                placeholder={t("mobileNumber")}
                specialLabel=""
                /> */}
              {/* <PhoneInput
                country={"us"}
                value={""}
                onChange={(phone) => {
                }}
                inputStyle={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  textAlign: "start",
                  fontSize: "20px",
                  fontFamily: "alexandria, sans-serif",
                  padding: "20px",
                }}
                dropdownStyle={{
                  border: "none",
                  outline: "none",
                  textAlign: "start",
                  fontSize: "18px",
                  fontFamily: "alexandria, sans-serif",
                  padding: "10px",
                }}
                containerStyle={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  textAlign: "start",
                  fontSize: "18px",
                  fontFamily: "alexandria, sans-serif",
                  padding: "10px",
                }}
                buttonStyle={{
                  border: "none",
                  outline: "none",
                  textAlign: "start",
                  fontSize: "18px",
                  fontFamily: "alexandria, sans-serif",
                  padding: "10px",
                }}
                searchPlaceholder={t("search")}
                enableSearch
              /> */}
              <input
                type="tel"
                name="phone"
                placeholder={t("form.phone")}
                className="text-start 2xl:text-[20px]  w-full outline-none p-2"
              />
              <CiPhone className="text-[#333333] text-[20px] sm:text-[22px] md:text-[24px] self-center" />
            </div>
          </div>

          <div className="flex flex-row-reverse gap-2 justify-start  w-full  border-2 border-[#C3C3C3] rounded-2xl p-2 relative">
            <CiMail className="text-[#333333] text-[20px] sm:text-[22px] md:text-[24px] self-center" />
            <input
              type="email"
              name="email"
              placeholder={t("form.email")}
              className="text-start 2xl:text-[20px]  w-full outline-none p-2"
              style={{
                height: "100%",
              }}
            />
          </div>
          <div className="flex flex-row-reverse gap-2 justify-start w-full border-2 border-[#C3C3C3] rounded-2xl p-2 relative">
            <textarea
              name="message"
              placeholder={t("form.message")}
              className="w-full p-3  rounded-lg text-start resize-none 2xl:text-[20px]  h-full outline-none"
              style={{
                height: "100%",
              }}
            />
          </div>
          <input type="hidden" name="type" value={activeTab} />
          {itemId && <input type="hidden" name="project_id" value={itemId} />}
          <button
            type="submit"
            className="cursor-pointer w-full rounded-2xl bg-[#E37C35] border text-white py-3 px-4 hover:bg-white  hover:border-[#E37c35] hover:text-[#E37C35] transition-all duration-300 self-end"
          >
            {t("form.bookNow")}
          </button>
        </Form>
      </div>
    </>
  );
}

export default ItemForm;
