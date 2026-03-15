import React from 'react';
import styles from './Typography.module.css';

/**
 * Nissan WDS 2.0 Typography Components
 * Pre-built React components following the design system
 */

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

// Display Components
export const DisplayXL = ({ children, className = '', as: Component = 'h1' }: TypographyProps) => (
  <Component className={`${styles.displayXL} ${className}`}>
    {children}
  </Component>
);

export const DisplayL = ({ children, className = '', as: Component = 'h2' }: TypographyProps) => (
  <Component className={`${styles.displayL} ${className}`}>
    {children}
  </Component>
);

export const DisplayM = ({ children, className = '', as: Component = 'h2' }: TypographyProps) => (
  <Component className={`${styles.displayM} ${className}`}>
    {children}
  </Component>
);

export const DisplayS = ({ children, className = '', as: Component = 'h3' }: TypographyProps) => (
  <Component className={`${styles.displayS} ${className}`}>
    {children}
  </Component>
);

export const DisplayXS = ({ children, className = '', as: Component = 'h3' }: TypographyProps) => (
  <Component className={`${styles.displayXS} ${className}`}>
    {children}
  </Component>
);

// Subtitle Components
export const SubtitleM = ({ children, className = '', as: Component = 'h4' }: TypographyProps) => (
  <Component className={`${styles.subtitleM} ${className}`}>
    {children}
  </Component>
);

export const SubtitleS = ({ children, className = '', as: Component = 'h5' }: TypographyProps) => (
  <Component className={`${styles.subtitleS} ${className}`}>
    {children}
  </Component>
);

// Body Components
export const BodyM = ({ children, className = '', as: Component = 'p' }: TypographyProps) => (
  <Component className={`${styles.bodyM} ${className}`}>
    {children}
  </Component>
);

export const BodyMLight = ({ children, className = '', as: Component = 'p' }: TypographyProps) => (
  <Component className={`${styles.bodyMLight} ${className}`}>
    {children}
  </Component>
);

export const BodyMBold = ({ children, className = '', as: Component = 'p' }: TypographyProps) => (
  <Component className={`${styles.bodyMBold} ${className}`}>
    {children}
  </Component>
);

export const BodyS = ({ children, className = '', as: Component = 'p' }: TypographyProps) => (
  <Component className={`${styles.bodyS} ${className}`}>
    {children}
  </Component>
);

export const BodySLight = ({ children, className = '', as: Component = 'p' }: TypographyProps) => (
  <Component className={`${styles.bodySLight} ${className}`}>
    {children}
  </Component>
);

export const BodySBold = ({ children, className = '', as: Component = 'p' }: TypographyProps) => (
  <Component className={`${styles.bodySBold} ${className}`}>
    {children}
  </Component>
);

// Disclaimer Components
export const Disclaimer = ({ children, className = '', as: Component = 'small' }: TypographyProps) => (
  <Component className={`${styles.disclaimer} ${className}`}>
    {children}
  </Component>
);

export const DisclaimerLight = ({ children, className = '', as: Component = 'small' }: TypographyProps) => (
  <Component className={`${styles.disclaimerLight} ${className}`}>
    {children}
  </Component>
);

export const DisclaimerBold = ({ children, className = '', as: Component = 'small' }: TypographyProps) => (
  <Component className={`${styles.disclaimerBold} ${className}`}>
    {children}
  </Component>
);

// Link Component
interface LinkProps extends TypographyProps {
  href: string;
  target?: string;
  rel?: string;
}

export const Link = ({ children, href, className = '', target, rel }: LinkProps) => (
  <a
    href={href}
    target={target}
    rel={rel}
    className={`${styles.link} ${className}`}
  >
    {children}
  </a>
);
