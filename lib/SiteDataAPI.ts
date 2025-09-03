// lib/getSiteData.ts

import { BASE_URL } from "./config";

export interface SiteData {
  id: number;
  phone: string;
  email: string;
  fb_link: string;
  instagram_link: string;
  youtube_link: string;
  x_link: string;
  linkedin_link: string;
  address: string;
  address_link: string;
  header_logo: string;
  footer_logo: string;
  home_page_hero_title: string;
  home_page_hero_description: string;
  home_page_hero_image: string;
  home_page_hero_btn_text: string;
  home_page_hero_btn_link: string;
  home_page_about_title: string;
  home_page_about_description: string;
  home_page_about_btn_text: string;
  home_page_about_btn_link: string;
  home_page_about_video_url: string;
  about_page_hero_title: string;
  about_page_hero_description: string;
  about_page_hero_image: string;
  about_page_title_1: string;
  about_page_description_1: string;
  about_page_image_1: string;
  about_page_title_2: string;
  about_page_description_2: string;
  about_page_image_2: string;
  about_page_title_3: string;
  about_page_description_3: string;
  about_page_image_3: string;
  about_page_video_url: string;
  about_page_pdf_url: string;
  about_page_images: string[];
  projects_page_hero_title: string;
  projects_page_hero_description: string;
  projects_page_hero_image: string;
  projects_page_projects_title: string;
  projects_page_projects_description: string;
  prev_projects_page_hero_title: string;
  prev_projects_page_hero_description: string;
  prev_projects_page_hero_image: string;
  prev_projects_page_projects_title: string;
  prev_projects_page_projects_description: string;
  news_page_hero_title: string;
  news_page_hero_description: string;
  news_page_hero_image: string;
  contact_page_hero_title: string;
  contact_page_hero_description: string;
  contact_page_hero_image: string;
  contact_page_work_days: string;
  contact_page_form_title: string;
  contact_page_form_description: string;
  career_page_hero_title: string;
  career_page_hero_description: string;
  career_page_hero_image: string;
  career_page_form_title: string;
  career_page_form_description: string;
  cities_section_title: string;
  cities_section_description: string;
  projects_section_title: string;
  projects_section_description: string;
  testimonials_page_hero_title: string;
  testimonials_page_hero_description: string;
  testimonials_page_hero_image: string;
  testimonials_section_title: string;
  testimonials_section_description: string;
  agents_section_title: string;
  agents_section_description: string;
  news_section_title: string;
  news_section_description: string;
  join_us_section_title: string;
  join_us_section_image: string;
  join_us_section_btn_text: string;
  join_us_section_btn_link: string;
  agents_page_hero_title: string;
  agents_page_hero_description: string;
  agents_page_hero_image: string;
  whatsapp_number?: string;
}

export async function getSiteData(locale="ar"): Promise<SiteData | null> {
  try {
    const res = await fetch(BASE_URL+'/api/site-data', { headers: { "Accept-Language": locale } });
    if (!res.ok) throw new Error('Failed to fetch site data');
    
    const json = await res.json();
    return json.data as SiteData;
  } catch (error) {
    console.error('Error loading site data:', error);
    return null;
  }
}
