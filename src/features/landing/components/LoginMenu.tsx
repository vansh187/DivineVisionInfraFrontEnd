import { useRef, useState } from 'react';
import { useClickOutside } from '../../../shared/hooks/useClickOutside';
import { loginOptions } from '../data/loginOptions';
import styles from './LoginMenu.module.css';

export function LoginMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useClickOutside(rootRef, () => setOpen(false), open);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        Login
        <svg className={styles.chevron} viewBox="0 0 10 6" aria-hidden="true">
          <path
            d="M1 1l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className={styles.panel} role="menu">
          {loginOptions.map((option) => (
            <a
              key={option.href}
              href={option.href}
              role="menuitem"
              className={styles.item}
              onClick={() => setOpen(false)}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
