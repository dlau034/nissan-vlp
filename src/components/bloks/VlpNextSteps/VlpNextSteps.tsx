import { storyblokEditable } from "@storyblok/react/rsc";
import { DisplayM } from "@/wds/Typography";
import styles from "./VlpNextSteps.module.css";

export default function VlpNextSteps({ blok }: { blok: any }) {
  return (
    <section className={styles.section} {...storyblokEditable(blok)}>
      <div className={styles.inner}>
        {/* Title — "Take the next step" */}
        {blok.title && (
          <DisplayM as="h2" className={styles.title}>
            {blok.title}
          </DisplayM>
        )}

        {/* 4 equal-width primary buttons */}
        {blok.actions?.length > 0 && (
          <div className={styles.actions}>
            {blok.actions.map((action: any) => {
              const href = action.url?.url || action.url?.cached_url || "#";
              return (
                <a key={action._uid} href={href} className={styles.btn}>
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
