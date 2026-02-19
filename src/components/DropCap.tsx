interface DropCapProps {
  children: string;
}

export function DropCap({ children }: DropCapProps) {
  return (
    <span className="drop-cap">
      {children}
    </span>
  );
}
