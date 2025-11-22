import group2 from '../assets/group_2.jpg';
import group3 from '../assets/group_3.jpg';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Link } from '../../catalyst-components/link';

const benefits = [
  'Faire Bezahlung',
  'Betriebliche Zusatzleistungen',
  '30 Tage Urlaub',
  'Moderne Maschinen',
  'Kollegiales Miteinander',
  'Gemeinsame Team-Events',
];

const values = [
  {
    name: 'Qualität & Präzision',
    description:
      'Wir arbeiten mit höchster Sorgfalt und nach modernsten Standards – denn im Bau zählt, was Bestand hat.',
  },
  {
    name: 'Verlässlichkeit',
    description:
      'Unsere Kunden können sich darauf verlassen: Was wir zusagen, das halten wir. Termine und Qualität stehen an erster Stelle.',
  },
  {
    name: 'Sicherheit',
    description:
      'Sicheres Arbeiten hat für uns oberste Priorität – für unsere Mitarbeitenden, Partner und die Umwelt.',
  },
  {
    name: 'Teamgeist',
    description:
      'Erfolg entsteht gemeinsam. Wir unterstützen uns gegenseitig, packen an und finden immer eine Lösung.',
  },
  {
    name: 'Nachhaltigkeit',
    description:
      'Wir denken weiter – ressourcenschonend, umweltbewusst und zukunftsorientiert in allem, was wir tun.',
  },
  {
    name: 'Weiterentwicklung',
    description:
      'Stillstand ist keine Option. Wir investieren in moderne Technik und in die Ausbildung unseres Teams, um jeden Tag besser zu werden.',
  },
];

export function HomePage() {
  return (
    <div className="relative isolate -z-10 overflow-hidden bg-linear-to-b from-accent-primary/15 pt-14">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-sm ring-1 ring-accent-primary/10 sm:-mr-80 lg:-mr-96"
      />
      <div className="mx-auto max-w-7xl px-6 pt-32 sm:pt-40 pb-16 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
            Willkommen bei Ludwig Hahn Tief- und Kabelbau
          </h1>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Von Tiefbau über Kabelverlegung bis hin zu Glasfaserprojekten –
              wir schaffen die technische Basis für digitale und urbane
              Entwicklung. Mit moderner Technik, erfahrenem Team und hohem
              Qualitätsanspruch realisieren wir Projekte termingerecht und
              nachhaltig.
            </p>
          </div>
          <img
            alt=""
            src={group2}
            className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
      <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Unsere Werte
          </h2>
          <p className="mt-6 text-lg/8 text-gray-700">
            Bei uns steht der Mensch im Mittelpunkt – ob Kunde, Partner oder
            Kollege. Gemeinsam schaffen wir nachhaltige Infrastruktur, auf die
            man sich verlassen kann. Diese Werte leiten unser tägliches Handeln:
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {values.map(value => (
            <div key={value.name}>
              <dt className="font-semibold text-gray-900">{value.name}</dt>
              <dd className="mt-1 text-gray-600">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative isolate -z-10 mb-32 mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/75 px-6 py-16 shadow-lg ring-1 ring-gray-900/5 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <img
              alt=""
              src={group3}
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-none lg:aspect-square lg:h-auto lg:max-w-sm"
            />
            <div className="w-full flex-auto">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl">
                Werde Teil unseres Teams
              </h2>
              <p className="mt-6 text-lg/8 text-pretty text-gray-600">
                Bei uns erwarten dich spannende Aufgaben, ein motiviertes Team
                und die Möglichkeit, gemeinsam zu wachsen. Entfalte dein
                Potenzial und gestalte mit uns die Zukunft.
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7 text-gray-950 sm:grid-cols-2"
              >
                {benefits.map(benefit => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="h-7 w-5 flex-none text-accent-primary"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex">
                <Link
                  href="/about?scroll=jobs"
                  className="text-sm/6 font-semibold text-accent-primary hover:text-orange-600"
                >
                  Siehe dir unsere Stellenangebote an
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="aspect-1318/752 w-329.5 flex-none bg-linear-to-r from-[#f25c19]/25 to-[#f25c19]/25 opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
