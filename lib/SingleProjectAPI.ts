import { BASE_URL } from "./config";


export interface SingleProjectImage {
    image: string
}

export interface SingleProjectUnit {
  id: number;
  image_url: string;
  title: string;
  sold: boolean;
}
interface SingleProjectStep {
    title: string;
    description: string;
    video_url: string;
    images: SingleProjectImage[]
}
// Type from the API response

export interface APISingleProject {
  id: number;
  name: string;
  description: string | null;
  details: string | null;
  featuers: string | null;
  date: string;
  city_id: string;
  project_type_id: string;
  image_url: string | null;
  map_image_url: string | null;
  project_type: {
    id: number;
    name: string;
  };
  city: string;
  units: SingleProjectUnit[];
  steps: SingleProjectStep[];
  images: SingleProjectImage[];
  video_url: string;
  brochure_url: string;
  progress: number;
}

// UI/transformed type
export interface SingleProject {
  id: number;
  title: string;
  description: string;
  details: string;
  features: string;
  date: string;
  location: string;
  type: string;
  img: string;
  mapImg: string;
  brochure: string;
  units: SingleProjectUnit[];
  steps: SingleProjectStep[];
  images : SingleProjectImage[];
  video_url: string;
  brochure_url: string;
  progress: number;
  city: string;
}





export async function getProject(id: number, locale="ar"): Promise<SingleProject | undefined> {
  try {
    const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
      cache: "no-store",
      headers: { "Accept-Language": locale }
    });
    if (!res.ok) throw new Error("Failed to fetch project");
    const json = await res.json();
    const item: APISingleProject = json.data;

    return {
      id: item.id,
      title: item.name,
      description: item.description ?? "",
      details: item.details ?? "",
      features: item.featuers ?? "",
      date: new Date(item.date).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      location: item.city ?? "غير معروف",
      type: item.project_type?.name ?? "غير معروف",
      img: item.image_url ?? "/placeholder.png",
      mapImg: item.map_image_url ?? "",
      brochure: item.brochure_url ?? "",
      units: item.units ?? [],
      steps: item.steps ?? [],
      images: item.images ?? [],
      video_url: item.video_url ?? "",
      progress: item.progress ?? 100,
      brochure_url: item.brochure_url ?? "",
      city: item.city ?? ""
    };
  } catch (error) {
    console.error("Error fetching single project:", error);
    return undefined;
  }
}
