import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayXL, DisplayM, BodyMLight } from "@/wds/Typography";
import styles from "./VlpIntroSpecs.module.css";

function CtaButton({ label, url, variant }: { label: string; url: any; variant: string }) {
  const href = url?.url || url?.cached_url || "#";

  if (variant === "tertiary") {
    return (
      <a href={href} className={`${styles.ctaBase} ${styles.ctaTertiary}`}>
        <span>{label}</span>
        <span className={styles.ctaTertiaryUnderline} aria-hidden="true" />
      </a>
    );
  }

  const variantClass = variant === "secondary" ? styles.ctaSecondary : styles.ctaPrimary;
  return (
    <a href={href} className={`${styles.ctaBase} ${variantClass}`}>
      {label}
    </a>
  );
}

export default function VlpIntroSpecs({ blok }: { blok: any }) {
  const cta1Variant = blok.cta_variant || "primary";
  const cta2Variant = blok.cta2_variant || "primary";

  return (
    <section className={styles.specs} {...storyblokEditable(blok)}>
      <div className={styles.specsInner}>
        {/* Left: model name, description, CTA(s) */}
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
          {(blok.cta_label || blok.cta2_label) && (
            <div className={styles.ctaRow}>
              {blok.cta_label && (
                <CtaButton label={blok.cta_label} url={blok.cta_url} variant={cta1Variant} />
              )}
              {blok.cta2_label && (
                <CtaButton label={blok.cta2_label} url={blok.cta2_url} variant={cta2Variant} />
              )}
            </div>
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
