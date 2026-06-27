'use client';

const companies = [
  {
    name: 'Entel',
    src: '/images/companies/entel.png',
    darkInvert: true,
  },
  {
    name: 'Nova Academy',
    src: '/images/companies/nova.webp',
    darkInvert: false,
  },
  {
    name: 'Casa Andina',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/CA_LOGOVERSIONB.png',
    darkInvert: true,
  },
];

export default function CompanyTicker() {
  const items = [...companies, ...companies, ...companies];

  return (
    <div className="w-full overflow-hidden relative h-36 flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#f3f4f6] dark:from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#f3f4f6] dark:from-[#0a0a0a] to-transparent pointer-events-none" />

      <div className="ticker-track items-center">
        {items.map((company, i) => (
          <div key={`${company.name}-${i}`} className="flex items-center shrink-0">
            <div className="flex items-center justify-center w-52 h-28 mx-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:border-neutral-300 dark:hover:border-white/20 transition-all duration-300 cursor-default shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.src}
                alt={company.name}
                className={`h-14 w-36 object-contain ${company.darkInvert ? 'dark:brightness-0 dark:invert' : ''}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
