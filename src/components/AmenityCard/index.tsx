interface AmenityCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function AmenityCard({ icon, title, description }: AmenityCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-heading text-lg font-bold text-primary mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm">{description}</p>
    </div>
  );
}
