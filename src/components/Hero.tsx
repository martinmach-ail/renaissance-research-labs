export default function Hero() {
  return (
    <header
      className="text-center"
      style={{
        marginBottom: "32px",
      }}
    >
      {/* Title - Italic Libre Baskerville */}
      <h1
        className="font-display font-normal italic"
        style={{
          fontSize: "52px",
          letterSpacing: "-2px",
          marginBottom: "14px",
          color: "var(--text-black)",
        }}
      >
        RENAISSANCE RESEARCH LABS
      </h1>

      {/* Subtitle - Source Serif 4 Italic */}
      <p
        className="font-body italic"
        style={{
          fontSize: "17px",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
        }}
      >
        Three platforms to sharpen intuition, accelerate learning,
        <br />
        and elevate your decision-making edge.
      </p>

      {/* Gradient Accent Line */}
      <div
        style={{
          width: "50px",
          height: "2px",
          background:
            "linear-gradient(90deg, var(--legends-blue), var(--library-cyan), var(--archetypes-ice))",
          margin: "20px auto 0",
          borderRadius: "1px",
        }}
      />
    </header>
  );
}
