import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";
import "@/lib/storyblok";

// Always SSR — content is CMS-driven. Static generation at build time would
// freeze a 404 if no stories were published when the build ran.
export const dynamic = "force-dynamic";

// Next.js 16: params is a Promise
interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

async function fetchStory(slug: string, isDraft: boolean) {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
  const version =
    isDraft || process.env.NODE_ENV === "development" ? "draft" : "published";

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${token}&version=${version}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.error("[fetchStory] HTTP error:", res.status, res.statusText, "slug:", slug);
      return null;
    }
    const data = await res.json();
    return data.story ?? null;
  } catch (err) {
    console.error("[fetchStory] fetch failed for slug:", slug, err);
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { isEnabled: isDraft } = await draftMode();
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
