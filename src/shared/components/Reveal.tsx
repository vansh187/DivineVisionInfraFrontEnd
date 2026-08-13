import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Reveal.module.css';

type RevealTag = 'div' | 'p';

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
}

/**
 * Fades + lifts its children into view the first time they enter the
 * viewport. Generic UI primitive — no knowledge of any particular page,
 * so it can be reused anywhere a scroll reveal is needed.
 */
export function Reveal({ children, as = 'div', className }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = [styles.reveal, visible && styles.visible, className].filter(Boolean).join(' ');
  const Tag = as;

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
