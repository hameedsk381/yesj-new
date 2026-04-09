export const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Fetches data from Strapi API
 * @param path The API endpoint path (e.g., '/api/stories')
 * @param queryParams URLSearchParams or object for filtering/population
 */
export async function fetchStrapi(path: string, queryParams: Record<string, any> = {}) {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${STRAPI_URL}${path}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Helper to get full Strapi media URL
 * @param url The relative URL from Strapi media object
 */
export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Maps Strapi story attributes to the frontend story format
 */
export function mapStrapiStory(item: any) {
  const attrs = item.attributes;
  return {
    id: item.id,
    title: attrs.title,
    slug: attrs.slug,
    excerpt: attrs.excerpt,
    content: attrs.content,
    author: attrs.author,
    category: attrs.category,
    image_path: getStrapiMedia(attrs.image?.data?.attributes?.url) || null,
    featured: attrs.featured || false,
    created_at: attrs.publishedAt || attrs.createdAt,
  };
}

/**
 * Fetches all stories from Strapi
 */
export async function getStories() {
  try {
    const response = await fetchStrapi('/api/stories', { populate: 'image' });
    if (response.data) {
      return response.data.map(mapStrapiStory);
    }
    return [];
  } catch (error) {
    console.error('Error fetching stories from Strapi:', error);
    return [];
  }
}

/**
 * Maps Strapi event attributes
 */
export function mapStrapiEvent(item: any) {
  const attrs = item.attributes;
  return {
    id: item.id,
    title: attrs.title,
    description: attrs.description,
    date: attrs.date,
    location: attrs.location,
    fee: attrs.fee,
    deadline: attrs.deadline,
    image_path: getStrapiMedia(attrs.image?.data?.attributes?.url) || null,
    type: attrs.type,
    is_active: attrs.isActive ?? true,
    created_at: attrs.createdAt,
  };
}

export async function getEvents() {
  try {
    const response = await fetchStrapi('/api/events', { populate: 'image' });
    if (response.data) {
      return response.data.map(mapStrapiEvent);
    }
    return [];
  } catch (error) {
    console.error('Error fetching events from Strapi:', error);
    return [];
  }
}

/**
 * Maps Strapi team member attributes
 */
export function mapStrapiTeamMember(item: any) {
  const attrs = item.attributes;
  return {
    id: item.id,
    name: attrs.name,
    role: attrs.role,
    bio: attrs.bio,
    image_path: getStrapiMedia(attrs.image?.data?.attributes?.url) || null,
    twitter_url: attrs.twitterUrl,
    linkedin_url: attrs.linkedinUrl,
    created_at: attrs.createdAt,
  };
}

export async function getTeamMembers() {
  try {
    const response = await fetchStrapi('/api/team-members', { populate: 'image' });
    if (response.data) {
      return response.data.map(mapStrapiTeamMember);
    }
    return [];
  } catch (error) {
    console.error('Error fetching team members from Strapi:', error);
    return [];
  }
}

/**
 * Maps Strapi gallery item attributes
 */
export function mapStrapiGalleryItem(item: any) {
  const attrs = item.attributes;
  return {
    id: item.id,
    title: attrs.title,
    description: attrs.description,
    image_path: getStrapiMedia(attrs.image?.data?.attributes?.url) || null,
    category: attrs.category,
    created_at: attrs.createdAt,
  };
}

export async function getGalleryItems() {
  try {
    const response = await fetchStrapi('/api/gallery-items', { populate: 'image' });
    if (response.data) {
      return response.data.map(mapStrapiGalleryItem);
    }
    return [];
  } catch (error) {
    console.error('Error fetching gallery items from Strapi:', error);
    return [];
  }
}

/**
 * Fetches Site Settings (Single Type)
 */
export async function getSiteSettings() {
  try {
    const response = await fetchStrapi('/api/site-setting', { populate: '*' });
    return response.data?.attributes;
  } catch (error) {
    console.error('Error fetching site settings from Strapi:', error);
    return null;
  }
}

/**
 * Fetches Homepage content (Single Type)
 */
export async function getHomepage() {
  try {
    const response = await fetchStrapi('/api/homepage', { 
      populate: {
        hero: { populate: '*' },
        featuredPrograms: { populate: '*' },
        welcomeBlocks: { populate: '*' },
        impactCounters: { populate: '*' },
        transformationStory: { populate: '*' }
      }
    });
    return response.data?.attributes;
  } catch (error) {
    console.error('Error fetching homepage from Strapi:', error);
    return null;
  }
}

/**
 * Maps Strapi Program attributes
 */
export function mapStrapiProgram(item: any) {
  const attrs = item.attributes;
  return {
    id: item.id,
    slug: attrs.slug,
    shortTitle: attrs.shortTitle,
    title: attrs.title,
    badge: attrs.badge,
    tagline: attrs.tagline,
    subheading: attrs.subheading,
    icon: attrs.icon,
    logo: getStrapiMedia(attrs.logo?.data?.attributes?.url) || undefined,
    image: getStrapiMedia(attrs.image?.data?.attributes?.url) || "/placeholder.svg",
    overviewDescription: attrs.overviewDescription,
    megaMenuDescription: attrs.megaMenuDescription,
    cardBarClassName: attrs.cardBarClassName || "bg-primary",
    categories: attrs.categories?.split(',').map((c: string) => c.trim()) || [],
    megaMenuGroup: attrs.megaMenuGroup,
    sections: attrs.sections || [],
    heroActions: attrs.heroActions || [],
    bottomActions: attrs.bottomActions || [],
  };
}

export async function getPrograms() {
  try {
    const response = await fetchStrapi('/api/programs', { populate: '*' });
    if (response.data) {
      return response.data.map(mapStrapiProgram);
    }
    return [];
  } catch (error) {
    console.error('Error fetching programs from Strapi:', error);
    return [];
  }
}

/**
 * Maps Strapi Announcement attributes
 */
export function mapStrapiAnnouncement(item: any) {
  const attrs = item.attributes;
  return {
    id: item.id,
    text: attrs.content,
    ctaLabel: attrs.ctaLabel || 'Read More',
    href: attrs.link || '#',
    isActive: attrs.isActive ?? true,
  };
}

export async function getAnnouncements() {
  try {
    const response = await fetchStrapi('/api/announcements');
    if (response.data) {
      return response.data
        .map(mapStrapiAnnouncement)
        .filter((a: any) => a.isActive);
    }
    return [];
  } catch (error) {
    console.error('Error fetching announcements from Strapi:', error);
    return [];
  }
}

export async function getProgramBySlugFetcher(slug: string) {
  try {
    const response = await fetchStrapi('/api/programs', { 
      'filters[slug][$eq]': slug,
      populate: '*' 
    });
    if (response.data && response.data.length > 0) {
      return mapStrapiProgram(response.data[0]);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching program ${slug} from Strapi:`, error);
    return null;
  }
}

/**
 * Maps Strapi About Page attributes
 */
export function mapStrapiAboutPage(item: any) {
  const attrs = item.attributes;
  return {
    heroTitle: attrs.heroTitle,
    heroSubtitle: attrs.heroSubtitle,
    heroImage: getStrapiMedia(attrs.heroImage?.data?.attributes?.url),
    storyTitle: attrs.storyTitle,
    storyContent: attrs.storyContent,
    storyImage: getStrapiMedia(attrs.storyImage?.data?.attributes?.url),
    mission: attrs.mission,
    vision: attrs.vision,
    philosophyTitle: attrs.philosophyTitle,
    philosophyContent: attrs.philosophyContent,
  };
}

export async function getAboutPage() {
  try {
    const response = await fetchStrapi('/api/about-page', { populate: '*' });
    if (response.data) {
      return mapStrapiAboutPage(response.data);
    }
    return null;
  } catch (error) {
    console.error('Error fetching about page from Strapi:', error);
    return null;
  }
}
