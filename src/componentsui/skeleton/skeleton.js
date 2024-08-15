import React from 'react';
import styles from './skeleton.module.css';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(styles.skeleton, className)}
      {...props}
    />
  );
}

export { Skeleton };
