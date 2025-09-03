"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function loading() {
  const [showColorLogo, setShowColorLogo] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      // ننتقل في الإطار التالي لإعطاء فرصة للرسم الأول
      setShowColorLogo(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div
        className={`p-4 rounded-3xl transition-all duration-1000 ease-in-out ${
          showColorLogo ? "bg-transparent" : "bg-[#323294]"
        } `}
      >
        <div className={`relative w-20 h-20 sm:w-30 sm:h-30 md:w-42 md:h-42`}>
          {/* الصورة البيضاء */}
          <Image
            src="/welcomeLogo.svg"
            alt="White Logo"
            fill
            style={{ objectFit: "contain" }}
            className={`welcome-logo absolute transition-opacity duration-1000 ${
              showColorLogo ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* الصورة الملونة */}
          <Image
            src="/welcomeLogoColor.svg"
            alt="Color Logo"
            fill
            style={{ objectFit: "contain" }}
            className={`welcome-logo transition-opacity duration-1000 ${
              showColorLogo ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
