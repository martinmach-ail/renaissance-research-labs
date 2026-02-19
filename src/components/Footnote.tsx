interface FootnoteProps {
  id: string;
}

export function Footnote({ id }: FootnoteProps) {
  return (
    <sup className="footnote-ref">
      <a href={`#fn-${id}`} id={`fnref-${id}`}>
        [{id}]
      </a>
    </sup>
  );
}
