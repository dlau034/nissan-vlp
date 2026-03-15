import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./VlpBanner.module.css";

export default function VlpBanner({ blok }: { blok: any }) {
  return (
    <section className={styles.banner} {...storyblokEditable(blok)}>
      {blok.banner_image?.filename && (
        <Image
          src={blok.banner_image.filename}
          alt={blok.banner_image.alt || "Vehicle banner"}
          fill
          priority
          className={styles.image}
        />
      )}
    </section>
  );
}
