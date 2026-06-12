interface HeroProps {
  title: string;
  subtitle: string;
  onStartTuning?: () => void;
}

export function Hero({ title, subtitle, onStartTuning }: HeroProps) {
  return (
    <section className="text-center py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
        {title}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
      {onStartTuning && (
        <button
          onClick={onStartTuning}
          className="mt-8 inline-flex items-center px-8 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/25"
        >
          Start Tuning
        </button>
      )}
    </section>
  );
}
