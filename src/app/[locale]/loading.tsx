"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div
        className={`p-4 rounded-3xl transition-all duration-1000 ease-in-out  `}
      >
        <div className={`relative w-20 h-20 sm:w-30 sm:h-30 md:w-42 md:h-42`}>
          <Image
            src="/welcomeLogo.svg"
            alt="White Logo"
            fill
            style={{ objectFit: "contain" }}
            className={`welcome-logo absolute transition-opacity duration-1000 `}
          />
          <Image
            src="/welcomeLogoColor.svg"
            alt="Color Logo"
            fill
            style={{ objectFit: "contain" }}
            className={`welcome-logo transition-opacity duration-1000 `}
          />
        </div>
      </div>
    </div>
  );
}
