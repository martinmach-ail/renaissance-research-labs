interface PlaybookProps {
  name: string;
  description?: string;
  steps: string[];
  conditions: string;
  risks?: string;
}

export function Playbook({ name, description, steps, conditions, risks }: PlaybookProps) {
  return (
    <div className="playbook-card">
      <h3 className="playbook-name">{name}</h3>
      {description && (
        <p className="playbook-description">{description}</p>
      )}
      <ol className="playbook-steps">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="playbook-conditions">
        <div className="playbook-conditions-label">When It Works</div>
        <p className="playbook-conditions-text">{conditions}</p>
      </div>
      {risks && (
        <div className="playbook-risks">
          <div className="playbook-risks-label">Risks</div>
          <p className="playbook-risks-text">{risks}</p>
        </div>
      )}
    </div>
  );
}
