/**
 * Marginalia Component
 *
 * Returns null because marginalia content is rendered in the right sidebar
 * via MarginaliaSidebar, not inline. The MDX <Marginalia> tags serve as
 * content markers only — actual data comes from YAML frontmatter.
 */

interface MarginaliaProps {
  type: string;
  title?: string;
  children?: React.ReactNode;
  source?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Marginalia(_props: MarginaliaProps) {
  return null;
}
