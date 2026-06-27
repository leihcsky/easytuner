type Badge = {
  href: string;
  src: string;
  alt: string;
};

const badges: Badge[] = [
  {
    href: "https://toolfame.com/item/easytuner",
    src: "https://toolfame.com/badge-light.svg",
    alt: "Featured on toolfame.com",
  },
  {
    href: "https://appnetworker.com/products/easytuner",
    src: "https://appnetworker.com/assets/images/badge.png",
    alt: "App Networker",
  },
  {
    href: "https://starterbest.com",
    src: "https://starterbest.com/badages-awards.svg",
    alt: "Featured on Starter Best",
  },
];

export function BadgeMarquee() {
  return (
    <div className="badge-marquee relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-gray-50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-gray-50 to-transparent"
        aria-hidden="true"
      />
      <div className="badge-marquee-track flex w-full items-center justify-center gap-10 py-1">
        {badges.map((badge) => (
          <a
            key={badge.href}
            href={badge.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 opacity-90 hover:opacity-100 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badge.src}
              alt={badge.alt}
              loading="lazy"
              className="h-8 w-auto"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
