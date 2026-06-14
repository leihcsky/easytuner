interface CompactHeroProps {
  title: string;
  subtitle: string;
}

export function CompactHero({ title, subtitle }: CompactHeroProps) {
  return (
    <header className="mb-3">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        {title}
      </h1>
      <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
    </header>
  );
}
