import { storyblokEditable } from "@storyblok/react/rsc";
import { Accordion } from "@/wds/Accordion";
import { DisplayM } from "@/wds/Typography";
import styles from "./VlpFaq.module.css";

interface FaqItem {
  _uid: string;
  question: string;
  answer: any;
}

interface VlpFaqBlok {
  _uid: string;
  component: string;
  title: string;
  items: FaqItem[];
}

function getRichTextContent(answer: any): string {
  if (typeof answer === "string") return answer;
  if (!answer?.content) return "";
  return answer.content
    .flatMap((node: any) => node.content?.map((c: any) => c.text || "") || [])
    .join(" ");
}

export default function VlpFaq({ blok }: { blok: any }) {
  const accordionItems = (blok.items || []).map((item: any) => ({
    title: item.question,
    content: getRichTextContent(item.answer),
  }));

  return (
    <section className={styles.section} {...storyblokEditable(blok)}>
      <div className={styles.inner}>
        {blok.title && (
          <DisplayM as="h2" className={styles.title}>{blok.title}</DisplayM>
        )}
        <Accordion items={accordionItems} />
      </div>
    </section>
  );
}
