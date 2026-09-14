type DemoPlaceholderProps = {
  title: string;
  futureComponent: string;
  description?: string;
  aspect: 'product' | 'admin';
  label?: string;
  status?: string;
};

export function DemoPlaceholder({
  title,
  futureComponent,
  description,
  aspect,
  label = 'PRODUCT FLOW',
  status = 'Interactive product walkthrough planned',
}: DemoPlaceholderProps) {
  return (
    <div
      className="demo-placeholder"
      data-aspect={aspect}
      data-future-component={futureComponent}
    >
      <span>{label}</span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <small>{status}</small>
    </div>
  );
}
