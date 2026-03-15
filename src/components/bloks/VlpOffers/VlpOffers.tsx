import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayM, DisplayXS, BodyMLight } from "@/wds/Typography";
import styles from "./VlpOffers.module.css";

export default function VlpOffers({ blok }: { blok: any }) {
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
            {blok.items.map((item: any) => {
              const href = item.cta_url?.url || item.cta_url?.cached_url || "#";
              return (
                <li key={item._uid} className={styles.card}>
                  {item.badge && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                  {item.image?.filename && (
                    <div className={styles.imageWrap}>
                      <Image
                        src={item.image.filename}
                        alt={item.image.alt || item.model}
                        fill
                        className={styles.image}
                      />
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    {item.model && (
                      <DisplayXS as="h3" className={styles.model}>
                        {item.model}
                      </DisplayXS>
                    )}
                    {item.offer_detail && (
                      <BodyMLight className={styles.offerDetail}>
                        {item.offer_detail}
                      </BodyMLight>
                    )}
                    {item.cta_label && (
                      <a href={href} className={styles.cta}>
                        {item.cta_label}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
