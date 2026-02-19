interface PullQuoteProps {
  attribution?: string;
  children: React.ReactNode;
}

export function PullQuote({ attribution, children }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote">
      <div className="pull-quote-text">{children}</div>
      {attribution && (
        <p className="pull-quote-attribution">{attribution}</p>
      )}
    </blockquote>
  );
}
