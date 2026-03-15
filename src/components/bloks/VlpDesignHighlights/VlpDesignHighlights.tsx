import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayM, DisplayXS, BodyMLight } from "@/wds/Typography";
import styles from "./VlpDesignHighlights.module.css";

export default function VlpDesignHighlights({ blok }: { blok: any }) {
  const exploreLinkHref = blok.explore_url?.url || blok.explore_url?.cached_url || "#";

  return (
    <section className={styles.section} {...storyblokEditable(blok)}>
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.header}>
          {blok.title && (
            <DisplayM as="h2" className={styles.title}>
              {blok.title}
            </DisplayM>
          )}
          {blok.explore_label && (
            <a href={exploreLinkHref} className={styles.exploreLink}>
              <span>{blok.explore_label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>

        {blok.items?.length > 0 && (
          <ul className={styles.grid}>
            {blok.items.map((item: any) => (
              <li key={item._uid} className={styles.card}>
                {item.image?.filename && (
                  <div className={styles.imageWrap}>
                    <Image
                      src={item.image.filename}
                      alt={item.image.alt || item.caption}
                      fill
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  {item.caption && (
                    <DisplayXS as="h3" className={styles.caption}>
                      {item.caption}
                    </DisplayXS>
                  )}
                  {item.body && (
                    <BodyMLight className={styles.body}>{item.body}</BodyMLight>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
