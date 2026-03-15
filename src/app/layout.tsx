import type { Metadata } from "next";
import { StoryblokProvider } from "@/components/StoryblokProvider";
import "@/wds/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nissan VLP POC",
  description: "Nissan Vehicle Landing Page – Storyblok + WDS POC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoryblokProvider>{children}</StoryblokProvider>
      </body>
    </html>
  );
}
