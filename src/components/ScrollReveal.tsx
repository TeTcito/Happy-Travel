import React, { useRef, useState, useEffect } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom-in' | 'none';
  distance?: number;
  scale?: number;
  blur?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  style = {},
  delay = 0,
  duration = 750,
  direction = 'up',
  distance = 28,
  scale = 0.98,
  blur = false,
  threshold = 0.08,
  rootMargin = '0px 0px -20px 0px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activates on BOTH entry AND exit!
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(${scale})`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(${scale})`;
      case 'left':
        return `translate3d(${distance}px, 0, 0) scale(${scale})`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0) scale(${scale})`;
      case 'zoom-in':
        return `translate3d(0, 0, 0) scale(${scale < 1 ? scale : 0.92})`;
      case 'none':
      default:
        return `translate3d(0, 0, 0) scale(${scale})`;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(4px)') : undefined,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)${blur ? `, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)` : ''}`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform'
      }}
      className={className}
    >
      {children}
    </div>
  );
};
