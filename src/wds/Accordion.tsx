'use client';
import React, { useState } from 'react';
import styles from './Accordion.module.css';

/**
 * Nissan WDS 2.0 Accordion Component
 * Matches Figma spec: stacked collapsible items with keyline dividers,
 * plus/minus icon toggle, hover underline, and focus ring states.
 */

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onChange?: (open: boolean) => void;
}

export const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
  open,
  onChange,
}: AccordionItemProps) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open! : internalOpen;

  const toggle = () => {
    if (!isControlled) setInternalOpen((v) => !v);
    onChange?.(!isOpen);
  };

  return (
    <div className={styles.item}>
      <div className={styles.divider} />
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <span className={styles.titleText}>{title}</span>
        <span className={styles.iconWrap} aria-hidden="true">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      <div className={[styles.bodyWrapper, isOpen ? styles.bodyWrapperOpen : ''].filter(Boolean).join(' ')}>
        <div className={styles.bodyClip}>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  items: Array<{ title: string; content: string }>;
  className?: string;
}

export const Accordion = ({ items, className = '' }: AccordionProps) => (
  <div className={[styles.stack, className].filter(Boolean).join(' ')}>
    {items.map((item, i) => (
      <AccordionItem key={i} title={item.title}>
        {item.content}
      </AccordionItem>
    ))}
    <div className={styles.divider} />
  </div>
);

export default Accordion;
