// lib/getPreviousProjects.ts

import { BASE_URL } from "./config";

export interface ProjectType {
  id: number | null;
  name: string;
  projects_count: number | null;
}

export interface PreviousProject {
  id: number;
  name: string;
  description: string | null;
  details: string | null;
  featuers: string | null;
  date: string;
  progress: string | null;
  city_id: string | null;
  project_type_id: number | null;
  video_url: string | null;
  image_url: string | null;
  map_image_url: string | null;
  brochure_url: string | null;
  project_type: ProjectType;
  city: string;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export interface PreviousProjectsResponse {
  data: PreviousProject[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export async function getPreviousProjects(locale="ar"): Promise<PreviousProjectsResponse | null> {
  try {
    const res = await fetch(BASE_URL+'/api/prev-projects', {
      cache: 'no-store', // to ensure fresh data in SSR/SSG,
      headers: { "Accept-Language": locale }
    });

    if (!res.ok) throw new Error('Failed to fetch previous projects');
    // const json = await res.json().data;
    const json = await res.json() as { data: PreviousProject[] };

    return json as PreviousProjectsResponse;
  } catch (error) {
    console.error('Error fetching previous projects:', error);
    return null;
  }
}
