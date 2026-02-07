/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useInView,
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
export type RevealMargin =
  | `${number}px`
  | `${number}px ${number}px`
  | `${number}px ${number}px ${number}px`
  | `${number}px ${number}px ${number}px ${number}px`;

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
  margin?: RevealMargin;
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
  margin,
  cacheKey,
  persist = 'memory',
  children,
  ...rest
}: RevealProps<T>): JSX.Element {
  const reduceMotion = useReducedMotion();
  const tag = (as ?? 'div') as T;

  const alreadySeen = cacheKey ? hasSeen(cacheKey, persist) : false;

  const MotionComponent = (motion as any)[tag] as React.ComponentType<any>;

  const ref = useRef<HTMLElement | null>(null);

  const isInView = useInView(ref as any, {
    once,
    amount,
    ...(margin ? ({ margin: margin as any } as const) : {}),
  });

  const [armed, setArmed] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!inView) {
      setArmed(true);
      setPlay(true);
    }
  }, [inView]);

  useEffect(() => {
    if (alreadySeen) {
      setArmed(true);
      setPlay(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView || alreadySeen) return;
    if (!isInView) return;

    if (!armed) {
      setArmed(true);
      requestAnimationFrame(() => setPlay(true));
    } else {
      setPlay(true);
    }

    if (cacheKey) markSeen(cacheKey, persist);
  }, [isInView, inView, alreadySeen, armed, cacheKey, persist]);

  const dir = directionMap[from];
  const offset = useMemo(
    () => ({ x: dir.x * distance, y: dir.y * distance }),
    [dir.x, dir.y, distance]
  );

  const variants: Variants = useMemo(() => {
    if (reduceMotion) {
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.25, delay } },
      };
    }

    return {
      hidden: armed ? { opacity: 0, ...offset } : { opacity: 0, x: 0, y: 0 },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
    };
  }, [reduceMotion, delay, duration, armed, offset]);

  const anyRest = rest as any;
  const userOnAnimationComplete = anyRest.onAnimationComplete as
    | ((def: unknown) => void)
    | undefined;

  if (alreadySeen) {
    const props = {
      ...(rest as object),
      ref,
      variants,
      initial: 'show',
    };

    return children === undefined
      ? React.createElement(MotionComponent, props)
      : React.createElement(MotionComponent, props, children);
  }

  const props = inView
    ? {
        ...(rest as object),
        ref,
        variants,
        initial: 'hidden',
        animate: play ? 'show' : 'hidden',
        onAnimationComplete: (def: unknown) => userOnAnimationComplete?.(def),
      }
    : {
        ...(rest as object),
        ref,
        variants,
        initial: 'hidden',
        animate: 'show',
        onAnimationComplete: (def: unknown) => {
          userOnAnimationComplete?.(def);
          if (cacheKey) markSeen(cacheKey, persist);
        },
      };

  return children === undefined
    ? React.createElement(MotionComponent, props)
    : React.createElement(MotionComponent, props, children);
}
