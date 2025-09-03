import { BASE_URL } from "./config";

// Raw API data structure
export interface APINewsItem {
  id: number;
  news_type_id: string;
  title: string;
  content: string | null;
  date: string;
  image_url: string;
  news_type: {
    id: number;
    name: string;
  };
}

// Transformed structure for frontend
export interface NewsItem {
  id: number;
  name: string;
  date: string;
  img: string;
}

export async function getNews(
  filternewstype = 0,
  limit = 6,
  locale = "ar"
): Promise<NewsItem[]> {
  try {
    const query =
      filternewstype != 0
        ? `news-filter?limit=${limit}&news_type_id=${filternewstype}`
        : `news?limit=${limit}`;
    const res = await fetch(`${BASE_URL}/api/${query}`, {
      cache: "no-store",
      headers: { "Accept-Language": locale },
    });
    if (!res.ok) throw new Error("Failed to fetch news");
    const json = await res.json();

    return json.data.map(
      (item: APINewsItem): NewsItem => ({
        id: item.id, // You can use index or item.news_type_id
        name: item.title || "اسم غير متوفر",
        date: new Date(item.date).toLocaleDateString("ar-EG", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        img: item.image_url || "/Events4.svg",
      })
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
