import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface ComparisonItem {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  type: 'WEB' | 'PHOTO';
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
