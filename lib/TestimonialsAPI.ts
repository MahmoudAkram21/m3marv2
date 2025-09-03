// lib/testimonialsAPI.ts
import { BASE_URL } from "./config";

// Type from API response
export interface APITestimonial {
  id: number;
  video_url: string;
  image_url: string;
  title: string;
  date: string; // format: YYYY-MM-DD
}

// Type for frontend usage
export interface TestimonialData {
  id: number;
  video: string;
  image: string;
  title: string;
  date: string;
}

export async function getTestimonials(limit=12, locale="ar"): Promise<TestimonialData[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/testimonials?limit=`+limit, { cache: "no-store", headers: { "Accept-Language": locale } });
    if (!res.ok) throw new Error("Failed to fetch testimonials");

    const json = await res.json();

    return json.data.map((item: APITestimonial): TestimonialData => ({
      id: item.id,
      video: item.video_url,
      image: item.image_url ?? "/placeholder.webp",
      title: item.title,
      date: item.date,
    }));
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}
