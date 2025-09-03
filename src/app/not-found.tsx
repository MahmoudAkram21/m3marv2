"use client";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl">Page not found.</p>
        <p className="mt-4">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/" className="mt-8 inline-block px-8 py-4 border-2">
          Back to home
        </Link>
      </div>
    </div>
  );
}
/*******  b91b3284-2426-4038-a5ea-cbce82c65c79  *******/
