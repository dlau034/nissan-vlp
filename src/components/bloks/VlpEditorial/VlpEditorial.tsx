import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayM, BodyMLight, SubtitleS } from "@/wds/Typography";
import styles from "./VlpEditorial.module.css";

interface VlpEditorialBlok {
  _uid: string;
  component: string;
  image: { filename: string; alt?: string };
  eyebrow: string;
  headline: string;
  body: string;
  cta_label: string;
  cta_url: { url: string; cached_url?: string };
  image_side: "left" | "right";
}

export default function VlpEditorial({ blok }: { blok: any }) {
  const href = blok.cta_url?.url || blok.cta_url?.cached_url || "#";
  const isImageRight = blok.image_side === "right";

  return (
    <section
      className={[styles.section, isImageRight ? styles.imageRight : ""].filter(Boolean).join(" ")}
      {...storyblokEditable(blok)}
    >
      {blok.image?.filename && (
        <div className={styles.imageWrap}>
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || blok.headline}
            fill
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        {blok.eyebrow && (
          <SubtitleS className={styles.eyebrow}>{blok.eyebrow}</SubtitleS>
        )}
        {blok.headline && (
          <DisplayM className={styles.headline}>{blok.headline}</DisplayM>
        )}
        {blok.body && (
          <BodyMLight className={styles.body}>{blok.body}</BodyMLight>
        )}
        {blok.cta_label && (
          <a href={href} className={styles.cta}>
            {blok.cta_label}
          </a>
        )}
      </div>
    </section>
  );
}
