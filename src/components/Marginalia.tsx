/**
 * Marginalia Component
 *
 * In the reference HTML design, marginalia content appears ONLY in the right
 * column ("Contextual Notes"), not inline within the article text.
 *
 * This component intentionally returns null because:
 * 1. The VolumeMarginalia component handles the right column display
 * 2. Marginalia notes are mapped to sections and shown/hidden on scroll
 * 3. Inline callouts would clutter the clean article layout
 *
 * The MDX <Marginalia> tags serve as content markers - their data is extracted
 * and fed into the VolumeMarginalia system separately.
 */

type MarginaliaType =
  | 'KEY_THEME'
  | 'QUANT'
  | 'PRIMARY_VOICE'
  | 'MODERN_ECHO'
  | 'ANECDOTE'
  | 'CONTRARIAN'
  | 'MOTIF';

interface MarginaliaProps {
  type: MarginaliaType;
  title: string;
  children: React.ReactNode;
  source?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Marginalia(props: MarginaliaProps) {
  // Marginalia content is displayed in the right column via VolumeMarginalia,
  // not inline in the article. Return null to avoid cluttering the article.
  return null;
}
