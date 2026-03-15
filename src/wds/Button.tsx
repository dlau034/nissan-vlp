import React from 'react';
import styles from './Button.module.css';

/**
 * Nissan WDS 2.0 Button Component
 * Matches Figma spec: Primary (pill), Secondary (outlined pill), Tertiary (text + underline)
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  fullWidth?: boolean;
  theme?: 'light' | 'dark';
  /** Restricted use only. Use 'mobile' only for dense mobile contexts — consult WDS governance before use. */
  size?: 'default' | 'mobile';
}

export const Button = ({
  variant = 'primary',
  children,
  fullWidth = false,
  theme = 'light',
  size = 'default',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {
  const isLight = theme === 'light';
  const isMobile = size === 'mobile';

  // ── Tertiary variant: text + underline bar ──
  if (variant === 'tertiary') {
    const tertiaryClass = [
      styles.tertiary,
      isMobile ? styles.tertiaryMobile : '',
      isLight ? styles.tertiaryLight : styles.tertiaryDark,
      fullWidth ? styles.fullWidth : '',
      className,
    ].filter(Boolean).join(' ');

    const underlineClass = [
      styles.underline,
      isLight ? styles.underlineLight : styles.underlineDark,
    ].join(' ');

    return (
      <button className={tertiaryClass} disabled={disabled} {...props}>
        <span>{children}</span>
        <span className={underlineClass} />
      </button>
    );
  }

  // ── Primary & Secondary variants: pill buttons ──
  const variantClass = (() => {
    if (variant === 'secondary') {
      return isLight ? styles.secondaryLight : styles.secondaryDark;
    }
    return isLight ? styles.primaryLight : styles.primaryDark;
  })();

  const pillClass = [
    styles.pill,
    isMobile ? styles.pillMobile : '',
    variantClass,
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={pillClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
