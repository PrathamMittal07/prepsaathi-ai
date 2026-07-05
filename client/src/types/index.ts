export interface NavItem {
  label: string
  href: string
}

export interface FeatureCard {
  id: string
  icon: string
  title: string
  description: string
  tag?: string
  gradient: string
  iconBg: string
}

export interface StatItem {
  value: string
  label: string
}

export interface CTAButton {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}
