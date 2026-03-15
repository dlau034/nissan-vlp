import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayXL, DisplayM, BodyMLight } from "@/wds/Typography";
import styles from "./VlpIntroSpecs.module.css";

export default function VlpIntroSpecs({ blok }: { blok: any }) {
  const ctaHref = blok.cta_url?.url || blok.cta_url?.cached_url || "#";

  return (
    <section className={styles.specs} {...storyblokEditable(blok)}>
      <div className={styles.specsInner}>
        {/* Left: model name, description, CTA */}
        <div className={styles.specsLeft}>
          {blok.model_name && (
            <DisplayXL as="h1" className={styles.modelName}>
              {blok.model_name}
            </DisplayXL>
          )}
          {blok.description && (
            <BodyMLight className={styles.description}>
              {blok.description}
            </BodyMLight>
          )}
          {blok.cta_label && (
            <a href={ctaHref} className={styles.cta}>
              {blok.cta_label}
            </a>
          )}
        </div>

        {/* Right: spec badges grid */}
        {blok.specs?.length > 0 && (
          <ul className={styles.specGrid}>
            {blok.specs.map((spec: any) => (
              <li key={spec._uid} className={styles.specItem}>
                <DisplayM as="span" className={styles.specValue}>
                  {spec.value}
                </DisplayM>
                <BodyMLight as="span" className={styles.specLabel}>
                  {spec.label}
                </BodyMLight>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
