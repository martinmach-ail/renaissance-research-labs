// lib/taxonomy.ts
// Display name mappings for Scholia taxonomy codes

export const DISCIPLINE_DISPLAY_NAMES: Record<string, string> = {
  'DISC_OPERATIONS_EXECUTION': 'Operations & Execution',
  'DISC_PSYCHOLOGY_BEHAVIOR': 'Psychology & Behavior',
  'DISC_BUSINESS_ENTREPRENEURSHIP': 'Business & Entrepreneurship',
  'DISC_ECONOMICS_MARKETS': 'Economics & Markets',
  'DISC_STRATEGY_DECISION': 'Strategy & Decision',
  'DISC_LEADERSHIP_MANAGEMENT': 'Leadership & Management',
  'DISC_HISTORY_CONTEXT': 'History & Context',
  'DISC_PHILOSOPHY_ETHICS': 'Philosophy & Ethics',
  'DISC_TECHNOLOGY_ENGINEERING': 'Technology & Engineering',
  'DISC_FINANCE_INVESTMENT': 'Finance & Investment',
  'DISC_MARKETING_SALES': 'Marketing & Sales',
  'DISC_LAW_REGULATION': 'Law & Regulation',
};

export const ARCHETYPE_DISPLAY_NAMES: Record<string, string> = {
  'ARCH_BUILDER_CONSTRUCTOR': 'Builder-Constructor',
  'ARCH_SYSTEMS_THINKER': 'Systems Thinker',
  'ARCH_OPERATOR': 'Operator',
  'ARCH_DEALMAKER': 'Dealmaker',
  'ARCH_VISIONARY': 'Visionary',
  'ARCH_TURNAROUND_ARTIST': 'Turnaround Artist',
  'ARCH_CAPITAL_ALLOCATOR': 'Capital Allocator',
  'ARCH_CONGLOMERATEUR': 'Conglomerateur',
  'ARCH_FRANCHISE_BUILDER': 'Franchise Builder',
  'ARCH_MARKET_MAKER': 'Market Maker',
  'ARCH_CONTRARIAN': 'Contrarian',
  'ARCH_SCALE_OPERATOR': 'Scale Operator',
  'CROSS_CUTTING': 'Cross-Cutting Analysis',
  'ARCH_STRATEGIST': 'Strategist',
};

export const MOTIF_DISPLAY_NAMES: Record<string, string> = {
  'vertical-integration': 'Vertical Integration',
  'cost-compression': 'Cost Compression',
  'standardization': 'Standardization',
  'scale-economies': 'Scale Economies',
  'focus-discipline': 'Focus Discipline',
  'feedback-loops': 'Feedback Loops',
  'path-dependence': 'Path Dependence',
  'counter-positioning': 'Counter Positioning',
  'founder-control': 'Founder Control',
  'succession-crisis': 'Succession Crisis',
  'organizational-decline': 'Organizational Decline',
  'labor-management': 'Labor Management',
};

export const RELATIONSHIP_DISPLAY_NAMES: Record<string, string> = {
  'MENTOR': 'Mentor',
  'MENTEE': 'Mentee',
  'PARTNER': 'Partner',
  'COMPETITOR': 'Competitor',
  'RIVAL': 'Rival',
  'ANTAGONIST': 'Antagonist',
  'COLLABORATOR': 'Collaborator',
  'FAMILY': 'Family',
  'EMPLOYEE': 'Employee',
  'EXECUTIVE': 'Executive',
  'INVESTOR': 'Investor',
  'FRIEND': 'Friend',
  'INFLUENCE': 'Influence',
  'REFERENCE': 'Reference',
  'CAUTIONARY': 'Cautionary Tale',
  'INNOVATOR': 'Innovator',
  'LEADER': 'Leader',
  'ENGINEER': 'Engineer',
  'SUBJECT': 'Subject',
  'OPERATOR': 'Operator',
  'CHRONICLER': 'Chronicler',
};

export const MARGINALIA_TYPE_LABELS: Record<string, string> = {
  'KEY_THEME': 'Key Theme',
  'QUANT': 'By the Numbers',
  'ANECDOTE': 'Anecdote',
  'MODERN_ECHO': 'Modern Echo',
  'CONTRARIAN': 'Contrarian View',
  'MOTIF': 'Motif',
  'PRIMARY_VOICE': 'Primary Voice',
  'MECHANISM': 'Mechanism',
  'HISTORICAL': 'Historical Context',
  'PATTERN': 'Pattern',
  'STRATEGIC': 'Strategic Note',
  'SOURCE_CONTEXT': 'Source Context',
};

export const MARGINALIA_TYPE_COLORS: Record<string, string> = {
  'KEY_THEME': '#CA8A04',     // Gold
  'QUANT': '#0D9488',         // Teal
  'ANECDOTE': '#6366F1',      // Indigo
  'MODERN_ECHO': '#0891B2',   // Cyan
  'CONTRARIAN': '#DC2626',    // Red
  'MOTIF': '#CA8A04',         // Gold (same as theme)
  'PRIMARY_VOICE': '#0F2F53', // Navy
  'MECHANISM': '#7C3AED',     // Purple
  'HISTORICAL': '#92400E',    // Amber-brown
  'PATTERN': '#059669',       // Emerald
  'STRATEGIC': '#0046FF',     // Blue
  'SOURCE_CONTEXT': '#64748B', // Slate
};

/**
 * Get human-readable display name for any taxonomy code
 */
export function getDisplayName(code: string): string {
  // Check all mappings
  if (DISCIPLINE_DISPLAY_NAMES[code]) return DISCIPLINE_DISPLAY_NAMES[code];
  if (ARCHETYPE_DISPLAY_NAMES[code]) return ARCHETYPE_DISPLAY_NAMES[code];
  if (MOTIF_DISPLAY_NAMES[code]) return MOTIF_DISPLAY_NAMES[code];
  if (RELATIONSHIP_DISPLAY_NAMES[code]) return RELATIONSHIP_DISPLAY_NAMES[code];
  if (MARGINALIA_TYPE_LABELS[code]) return MARGINALIA_TYPE_LABELS[code];
  
  // Fallback: convert code to readable format
  return code
    .replace(/^(DISC_|ARCH_)/, '')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get color for marginalia type
 */
export function getMarginaliaColor(type: string): string {
  return MARGINALIA_TYPE_COLORS[type] || '#6B7280'; // Gray fallback
}

/**
 * Format motif slug to display name
 */
export function formatMotif(slug: string): string {
  if (MOTIF_DISPLAY_NAMES[slug]) return MOTIF_DISPLAY_NAMES[slug];
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
