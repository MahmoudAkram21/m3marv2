import { BASE_URL } from "./config";

// Type for raw API response
export interface APISingleNews {
  news_type_id: string;
  title: string;
  content: string | null;
  date: string;
  image_url: string | null;
  news_type: {
    id: number;
    name: string;
  };
}

// Transformed UI-friendly type
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  img: string;
  type: string;
}

export async function getNewsItem(
  id: number,
  locale = "ar"
): Promise<NewsItem | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/news/${id}`, {
      cache: "no-store",
      headers: { "Accept-Language": locale },
    });
    if (!res.ok) throw new Error("Failed to fetch news item");

    const json = await res.json();

    const item: APISingleNews = json.data;
    return {
      id,
      title: item.title || "بدون عنوان",
      content: item.content ?? "",
      date: new Date(item.date).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      img: item.image_url || "/placeholder-news.png",
      type: item.news_type?.name ?? "غير محدد",
    };
  } catch (error) {
    console.error("Error fetching news item:", error);
    return null;
  }
}
