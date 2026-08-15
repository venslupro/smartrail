import type { Locale } from '../i18n/request';

export interface StatItem {
  readonly value: string;
  readonly label: string;
}

export interface FeatureItem {
  readonly title: string;
  readonly desc: string;
}

export interface CoreValue {
  readonly tag: string;
  readonly title: string;
  readonly points: readonly string[];
  readonly icon: 'shield' | 'trending' | 'clock';
}

export interface ArchitectureLayer {
  readonly name: string;
  readonly subname: string;
  readonly description: string;
  readonly specs: readonly string[];
  readonly features: readonly string[];
}

export interface ArchitectureMetrics {
  readonly availability: string;
  readonly integrity: string;
  readonly accuracy: string;
  readonly latency: string;
  readonly mtbf: string;
  readonly cost: string;
}

export interface PilotInfoField {
  readonly label: string;
  readonly value: string;
}

export interface PilotInfo {
  readonly length: PilotInfoField;
  readonly type: PilotInfoField;
  readonly devices: PilotInfoField;
  readonly density: PilotInfoField;
}

export interface TargetItem {
  readonly title: string;
  readonly desc: string;
}

export interface RoadmapPhase {
  readonly phase: string;
  readonly time: string;
  readonly items: readonly string[];
}

export interface StrategyItem {
  readonly title: string;
  readonly desc: string;
}

export interface FooterSection {
  readonly title: string;
  readonly links: readonly string[];
}

export interface Messages {
  readonly locale: Locale;
}
