interface ThroughLineProps {
  children: React.ReactNode;
  title?: string;
}

export function ThroughLine({ children, title = "Through-Line Insight" }: ThroughLineProps) {
  return (
    <div className="through-line">
      <div className="through-line-label">{title}</div>
      <div className="through-line-text">{children}</div>
    </div>
  );
}
