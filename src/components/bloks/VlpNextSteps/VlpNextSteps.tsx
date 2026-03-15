import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayM } from "@/wds/Typography";
import styles from "./VlpNextSteps.module.css";

export default function VlpNextSteps({ blok }: { blok: any }) {
  return (
    <section className={styles.section} {...storyblokEditable(blok)}>
      <div className={styles.inner}>
        {blok.title && (
          <DisplayM as="h2" className={styles.title}>
            {blok.title}
          </DisplayM>
        )}

        {blok.actions?.length > 0 && (
          <div className={styles.actions}>
            {blok.actions.map((action: any) => {
              const href = action.url?.url || action.url?.cached_url || "#";
              const variant = action.variant || "primary";

              // Tertiary: column flex with text + underline bar (WDS spec)
              if (variant === "tertiary") {
                return (
                  <a
                    key={action._uid}
                    href={href}
                    className={`${styles.btnBase} ${styles.btnTertiary}`}
                  >
                    <span>{action.label}</span>
                    <span className={styles.btnTertiaryUnderline} aria-hidden="true" />
                  </a>
                );
              }

              // Primary or Secondary: pill shape
              const variantClass =
                variant === "secondary" ? styles.btnSecondary : styles.btnPrimary;

              return (
                <a
                  key={action._uid}
                  href={href}
                  className={`${styles.btnBase} ${variantClass}`}
                >
                  {action.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
