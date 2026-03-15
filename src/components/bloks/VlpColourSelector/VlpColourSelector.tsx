import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { BodyS } from "@/wds/Typography";
import styles from "./VlpColourSelector.module.css";

interface ColourSwatch {
  _uid: string;
  label: string;
  hex: string;
  image: { filename: string; alt?: string };
}

interface VlpColourSelectorBlok {
  _uid: string;
  component: string;
  image: { filename: string; alt?: string };
  colours: ColourSwatch[];
}

export default function VlpColourSelector({ blok }: { blok: any }) {
  const firstSwatch = blok.colours?.[0];
  const displayImage = firstSwatch?.image?.filename || blok.image?.filename;

  return (
    <section className={styles.section} {...storyblokEditable(blok)}>
      <div className={styles.inner}>
        {displayImage && (
          <div className={styles.imageWrap}>
            <Image
              src={displayImage}
              alt={blok.image?.alt || "Vehicle colour view"}
              fill
              className={styles.image}
            />
          </div>
        )}
        {blok.colours?.length > 0 && (
          <div className={styles.swatchRow}>
            {blok.colours.map((swatch: any, i: number) => (
              <div key={swatch._uid} className={styles.swatch}>
                <span
                  className={[styles.swatchCircle, i === 0 ? styles.swatchActive : ""].filter(Boolean).join(" ")}
                  style={{ background: swatch.hex || "transparent" }}
                  aria-label={swatch.label}
                />
                {swatch.label && (
                  <BodyS as="span" className={styles.swatchLabel}>
                    {swatch.label}
                  </BodyS>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
