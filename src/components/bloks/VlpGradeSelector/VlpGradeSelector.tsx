"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { DisplayM, DisplayS, BodyM, BodySLight } from "@/wds/Typography";
import styles from "./VlpGradeSelector.module.css";

// ─── Disclaimer icon — placeholder, no functionality yet ───
function DisclaimerIcon() {
  return (
    <svg
      className={styles.disclaimerIcon}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 7v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="4.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export default function VlpGradeSelector({ blok }: { blok: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const grades: any[] = blok.grades ?? [];
  const total = grades.length;

  // Measure slide width (card width + gap) from the DOM
  const getSlideWidth = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const firstCard = viewport.querySelector("[data-card]") as HTMLElement | null;
    const track = viewport.querySelector("[data-track]") as HTMLElement | null;
    if (!firstCard || !track) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 40;
    return firstCard.offsetWidth + gap;
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const slideWidth = getSlideWidth();
      viewport.scrollTo({ left: index * slideWidth, behavior: "smooth" });
    },
    [getSlideWidth]
  );

  const handlePrev = () => {
    const next = Math.max(0, currentIndex - 1);
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const handleNext = () => {
    const next = Math.min(total - 1, currentIndex + 1);
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  // Update dot indicator when user swipes natively on mobile
  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slideWidth = getSlideWidth();
    if (slideWidth === 0) return;
    setCurrentIndex(Math.round(viewport.scrollLeft / slideWidth));
  }, [getSlideWidth]);

  return (
    <section className={styles.section} {...storyblokEditable(blok)}>
      <div className={styles.inner}>

        {/* Header — title only, no arrows */}
        {blok.title && (
          <div className={styles.header}>
            <DisplayM as="h2" className={styles.title}>
              {blok.title}
            </DisplayM>
          </div>
        )}

        {/* Carousel viewport */}
        <div
          className={styles.viewport}
          ref={viewportRef}
          onScroll={handleScroll}
        >
          <ul className={styles.track} data-track>
            {grades.map((grade: any) => {
              const ctaHref = grade.cta_url?.url || grade.cta_url?.cached_url || "#";
              const financeHref = grade.finance_url?.url || grade.finance_url?.cached_url || "#";
              const compareHref = grade.compare_url?.url || grade.compare_url?.cached_url || "#";

              // Parse feature lines — split on newline, strip blanks
              const featureLines: string[] = grade.features
                ? grade.features.split("\n").filter((f: string) => f.trim() !== "")
                : [];
              const visibleFeatures = isExpanded ? featureLines : featureLines.slice(0, 3);
              const hasMoreFeatures = featureLines.length > 3;

              return (
                <li key={grade._uid} className={styles.card} data-card>

                  {/* Image — fill by width, natural height */}
                  {grade.image?.filename && (
                    <div className={styles.imageWrap}>
                      <Image
                        src={grade.image.filename}
                        alt={grade.image.alt || grade.grade_name || ""}
                        width={0}
                        height={0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.image}
                      />
                    </div>
                  )}

                  <div className={styles.cardBody}>

                    {/* Grade name */}
                    {grade.grade_name && (
                      <DisplayS as="h3" className={styles.gradeName}>
                        {grade.grade_name}
                      </DisplayS>
                    )}

                    {/* Price columns */}
                    {(blok.show_msrp || blok.show_monthly) && (
                      <div className={styles.prices}>
                        {blok.show_msrp && grade.price && (
                          <div className={styles.priceCol}>
                            <BodyM className={styles.priceValue}>{grade.price}</BodyM>
                            <div className={styles.priceLabel}>
                              <BodySLight as="span">{grade.msrp_label || "MSRP"}</BodySLight>
                              <DisclaimerIcon />
                            </div>
                          </div>
                        )}
                        {blok.show_monthly && grade.monthly_price && (
                          <div className={styles.priceCol}>
                            <BodyM className={styles.priceValue}>{grade.monthly_price}</BodyM>
                            <div className={styles.priceLabel}>
                              <BodySLight as="span">{grade.monthly_label || "Monthly"}</BodySLight>
                              <DisclaimerIcon />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Feature list — expandable */}
                    {featureLines.length > 0 && (
                      <div className={styles.features}>
                        <ul className={styles.featureList}>
                          {visibleFeatures.map((feature, i) => (
                            <li key={i} className={styles.featureItem}>
                              <BodySLight as="span">{feature}</BodySLight>
                            </li>
                          ))}
                        </ul>
                        {hasMoreFeatures && (
                          <button
                            type="button"
                            className={styles.seeMoreBtn}
                            onClick={() => setIsExpanded((prev) => !prev)}
                          >
                            {isExpanded ? "See less \u2212" : "See more +"}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Finance Calculator link */}
                    {blok.show_finance_calculator && grade.finance_label && (
                      <a href={financeHref} className={styles.financeLink}>
                        <DisclaimerIcon />
                        <BodySLight as="span">{grade.finance_label}</BodySLight>
                      </a>
                    )}

                    {/* CTA pill button */}
                    {grade.cta_label && (
                      <a href={ctaHref} className={styles.cta}>
                        {grade.cta_label}
                      </a>
                    )}

                    {/* Compare link */}
                    {blok.show_compare && grade.compare_label && (
                      <a href={compareHref} className={styles.compareLink}>
                        {grade.compare_label}
                      </a>
                    )}

                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom bar: dots (left) + arrows (right) */}
        <div className={styles.bottomBar}>
          <div className={styles.dots}>
            {grades.map((_: any, i: number) => (
              <button
                key={i}
                type="button"
                className={i === currentIndex ? styles.dotActive : styles.dot}
                aria-label={`Go to card ${i + 1}`}
                onClick={() => {
                  setCurrentIndex(i);
                  scrollToIndex(i);
                }}
              />
            ))}
          </div>
          <div className={styles.navArrows}>
            {/* Left arrow — right arrow SVG flipped horizontally */}
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Previous"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <svg
                width="24"
                height="8"
                viewBox="0 0 47 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{ transform: "scaleX(-1)" }}
              >
                <path
                  d="M0 7.68408H45M45 7.68408L38.4375 0.684082M45 7.68408L38.4375 14.6841"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            {/* Right arrow */}
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Next"
              onClick={handleNext}
              disabled={currentIndex === total - 1}
            >
              <svg
                width="24"
                height="8"
                viewBox="0 0 47 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0 7.68408H45M45 7.68408L38.4375 0.684082M45 7.68408L38.4375 14.6841"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
