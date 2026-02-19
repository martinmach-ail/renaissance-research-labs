export default function Footer() {
  return (
    <footer
      className="flex justify-between items-center flex-shrink-0"
      style={{
        padding: "18px 40px",
        borderTop: "1px solid #eee",
      }}
    >
      <span
        className="font-mono"
        style={{
          fontSize: "11px",
          color: "var(--text-muted)",
        }}
      >
        &copy; 2025 Renaissance Research Labs
      </span>
      <span
        className="font-body italic"
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
        }}
      >
        Built for deeper thinking.
      </span>
    </footer>
  );
}
