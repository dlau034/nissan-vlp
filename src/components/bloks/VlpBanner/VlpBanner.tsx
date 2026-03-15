import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./VlpBanner.module.css";

export default function VlpBanner({ blok }: { blok: any }) {
  const isVideo = blok.media_type === "video";

  return (
    <section className={styles.banner} {...storyblokEditable(blok)}>
      {isVideo && blok.banner_video?.filename ? (
        <video
          className={styles.video}
          src={blok.banner_video.filename}
          poster={blok.banner_video_poster?.filename || undefined}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        blok.banner_image?.filename && (
          <Image
            src={blok.banner_image.filename}
            alt={blok.banner_image.alt || "Vehicle banner"}
            fill
            priority
            className={styles.image}
          />
        )
      )}
    </section>
  );
}
