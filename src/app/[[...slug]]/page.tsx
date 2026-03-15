import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import "@/lib/storyblok";

// Always SSR — content is CMS-driven. Static generation at build time would
// freeze a 404 if no stories were published when the build ran.
export const dynamic = "force-dynamic";

// Next.js 16: params is a Promise
interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

async function fetchStory(slug: string, isDraft: boolean) {
  const sbApi = getStoryblokApi();
  // Always use draft in development; use published in production unless draft mode is enabled
  const version = isDraft || process.env.NODE_ENV === "development" ? "draft" : "published";
  try {
    const { data } = await sbApi.get(`cdn/stories/${slug}`, {
      version,
      resolve_relations: [],
    });
    return data.story;
  } catch {
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { isEnabled: isDraft } = await draftMode();
  // Await params — required in Next.js 16
  const { slug: slugArr } = await params;
  const slug = slugArr?.join("/") ?? "home";

  const story = await fetchStory(slug, isDraft);
  if (!story) notFound();

  return (
    <StoryblokStory
      story={story}
      bridgeOptions={{
        resolveRelations: [],
        customParent: "https://app.storyblok.com",
      }}
    />
  );
}
