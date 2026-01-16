import React from 'react';
import {
  motion,
  useReducedMotion,
  type HTMLElements,
  type HTMLMotionProps,
  type Variants,
} from 'framer-motion';
import { jsx } from '@emotion/react';
import JSX = jsx.JSX;

export type RevealFrom = 'left' | 'right' | 'up' | 'down';
export type MotionTag = keyof HTMLElements;
export type RevealPersist = 'memory' | 'session';

const memoryCache = new Set<string>();
const storagePrefix = 'reveal:v1:';

function hasSeen(key: string, persist: RevealPersist): boolean {
  if (memoryCache.has(key)) return true;
  if (persist === 'session' && typeof window !== 'undefined') {
    return window.sessionStorage.getItem(storagePrefix + key) === '1';
  }
  return false;
}

function markSeen(key: string, persist: RevealPersist): void {
  memoryCache.add(key);
  if (persist === 'session' && typeof window !== 'undefined') {
    window.sessionStorage.setItem(storagePrefix + key, '1');
  }
}

type RevealOwnProps<T extends MotionTag> = {
  as?: T;
  from?: RevealFrom;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  inView?: boolean;
  amount?: number;
  cacheKey?: string;
  persist?: RevealPersist;
  children?: React.ReactNode;
};

export type RevealProps<T extends MotionTag = 'div'> = Omit<
  HTMLMotionProps<T>,
  'initial' | 'animate' | 'whileInView' | 'variants' | 'viewport'
> &
  RevealOwnProps<T>;

const directionMap: Record<RevealFrom, { x: number; y: number }> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
};

export function Reveal<T extends MotionTag = 'div'>({
  as,
  from = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  inView = true,
  amount = 0.25,
  cacheKey,
  persist = 'memory',
  children,
  ...rest
}: RevealProps<T>): JSX.Element {
  const reduceMotion = useReducedMotion();
  const tag = (as ?? 'div') as T;

  const alreadySeen = cacheKey ? hasSeen(cacheKey, persist) : false;

  const dir = directionMap[from];
  const offset = { x: dir.x * distance, y: dir.y * distance };

  const variants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.25, delay } },
      }
    : {
        hidden: { opacity: 0, ...offset },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, delay, ease: 'easeOut' },
        },
      };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (motion as any)[tag] as React.ComponentType<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyRest = rest as any;
  const userOnViewportEnter = anyRest.onViewportEnter as
    | ((entry: IntersectionObserverEntry) => void)
    | undefined;
  const userOnAnimationComplete = anyRest.onAnimationComplete as
    | ((def: unknown) => void)
    | undefined;

  const onViewportEnter = (entry: IntersectionObserverEntry) => {
    userOnViewportEnter?.(entry);
    if (cacheKey) markSeen(cacheKey, persist);
  };

  const onAnimationComplete = (def: unknown) => {
    userOnAnimationComplete?.(def);
    if (cacheKey) markSeen(cacheKey, persist);
  };

  if (alreadySeen) {
    const props = { ...(rest as object), variants, initial: 'show' };
    return children === undefined
      ? React.createElement(Component, props)
      : React.createElement(Component, props, children);
  }

  const props = inView
    ? {
        ...(rest as object),
        variants,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once, amount },
        onViewportEnter,
      }
    : {
        ...(rest as object),
        variants,
        initial: 'hidden',
        animate: 'show',
        onAnimationComplete,
      };

  return children === undefined
    ? React.createElement(Component, props)
    : React.createElement(Component, props, children);
}
