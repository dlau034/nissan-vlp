import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayXS } from "@/wds/Typography";
import styles from "./VlpSplitCta.module.css";

interface VlpSplitCtaBlok {
  _uid: string;
  component: string;
  left_image: { filename: string; alt?: string };
  left_headline: string;
  left_cta_label: string;
  left_cta_url: { url: string; cached_url?: string };
  right_image: { filename: string; alt?: string };
  right_headline: string;
  right_cta_label: string;
  right_cta_url: { url: string; cached_url?: string };
}

export default function VlpSplitCta({ blok }: { blok: any }) {
  const leftHref = blok.left_cta_url?.url || blok.left_cta_url?.cached_url || "#";
  const rightHref = blok.right_cta_url?.url || blok.right_cta_url?.cached_url || "#";

  return (
    <section className={styles.section} {...storyblokEditable(blok)}>
      <div className={styles.panel}>
        {blok.left_image?.filename && (
          <div className={styles.imageWrap}>
            <Image
              src={blok.left_image.filename}
              alt={blok.left_image.alt || blok.left_headline}
              fill
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.overlay} />
        <div className={styles.content}>
          {blok.left_headline && (
            <DisplayXS className={styles.headline}>{blok.left_headline}</DisplayXS>
          )}
          {blok.left_cta_label && (
            <a href={leftHref} className={styles.cta}>
              {blok.left_cta_label}
            </a>
          )}
        </div>
      </div>
      <div className={styles.panel}>
        {blok.right_image?.filename && (
          <div className={styles.imageWrap}>
            <Image
              src={blok.right_image.filename}
              alt={blok.right_image.alt || blok.right_headline}
              fill
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.overlay} />
        <div className={styles.content}>
          {blok.right_headline && (
            <DisplayXS className={styles.headline}>{blok.right_headline}</DisplayXS>
          )}
          {blok.right_cta_label && (
            <a href={rightHref} className={styles.cta}>
              {blok.right_cta_label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
