import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayM, DisplayXS, BodyMLight, BodySLight } from "@/wds/Typography";
import styles from "./VlpGradeSelector.module.css";

export default function VlpGradeSelector({ blok }: { blok: any }) {
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

        {/* Grade cards */}
        {blok.grades?.length > 0 && (
          <ul className={styles.grid}>
            {blok.grades.map((grade: any) => {
              const href = grade.cta_url?.url || grade.cta_url?.cached_url || "#";
              return (
                <li key={grade._uid} className={styles.card}>
                  {grade.image?.filename && (
                    <div className={styles.imageWrap}>
                      <Image
                        src={grade.image.filename}
                        alt={grade.image.alt || grade.grade_name}
                        width={0}
                        height={0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.image}
                      />
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    {grade.grade_name && (
                      <DisplayXS as="h3" className={styles.gradeName}>
                        {grade.grade_name}
                      </DisplayXS>
                    )}
                    {grade.price && (
                      <BodyMLight className={styles.price}>{grade.price}</BodyMLight>
                    )}
                    {grade.spec_tags?.length > 0 && (
                      <ul className={styles.tags}>
                        {grade.spec_tags.map((tag: any, i: number) => (
                          <li key={i} className={styles.tag}>
                            <BodySLight as="span">{tag}</BodySLight>
                          </li>
                        ))}
                      </ul>
                    )}
                    {grade.cta_label && (
                      <a href={href} className={styles.cta}>
                        {grade.cta_label}
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
