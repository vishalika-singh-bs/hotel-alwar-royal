interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{title}</h2>
      <div className="w-20 h-1 bg-accent mx-auto mb-4" />
      {subtitle && <p className="text-neutral-500 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
