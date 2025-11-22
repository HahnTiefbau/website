import {
  BoltIcon,
  CalendarDaysIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import machines1 from '../assets/machines_1.png';
import machines2 from '../assets/machines_2.png';
import machines3 from '../assets/machines_3.png';
import machines4 from '../assets/machines_4.png';

const primaryFeatures = [
  {
    name: 'Tiefbau für Energieversorger und Stadtwerke',
    description:
      'Wir übernehmen sämtliche Tiefbauarbeiten für die Energie- und Versorgungswirtschaft – von der Planung über die Ausführung bis zur Wiederherstellung der Oberflächen. Dabei legen wir besonderen Wert auf Sicherheit, Qualität und eine saubere Baustelle.\n' +
      'Leistungsbereiche: Strom-, Gas-, Wasser- und Glasfasertrassen, Hausanschlüsse, Fundamentarbeiten.',
    icon: BoltIcon,
  },
  {
    name: 'Durchpressungen & Bodenraketen',
    description:
      'Mit modernen Press- und Bohrverfahren verlegen wir Leitungen unter Straßen, Gehwegen oder Zufahrten – schnell, präzise und ohne offene Gräben.\n' +
      'Technik: Erd-Bodenraketen im Durchmesser DA50–DA200, ideal für Hausanschlüsse und Querungen.\n' +
      'So minimieren wir Eingriffe in bestehende Oberflächen und ermöglichen effizientes Arbeiten auch auf engem Raum.',
    href: '#',
    icon: UsersIcon,
  },
  {
    name: 'Einzug und Verlegung von Kabelsystemen',
    description:
      'Wir kümmern uns um die fachgerechte Verlegung und Einziehung von Kabelsystemen im Rahmen größerer Tiefbaumaßnahmen. Ob Strom, Glasfaser oder Datenleitung – wir sorgen für sichere und langlebige Verbindungen.\n' +
      'Besonderheit: Unsere Teams sind flexibel einsetzbar und arbeiten Hand in Hand mit Netzbetreibern, Tiefbaufirmen und Kommunen.',
    href: '#',
    icon: CalendarDaysIcon,
  },
];

export function ServicesPage() {
  return (
    <div className="relative isolate -z-10">
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Unsere Leistungen
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Als erfahrenes Tief- und Kabelbauunternehmen bieten wir umfassende
            Leistungen für Energieversorger, Telekommunikationsunternehmen und
            Stadtwerke.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {primaryFeatures.map(feature => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-accent-primary">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="max-w-4xl">
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Unser Fuhrpark
            </h1>
            <p className="mt-6 text-xl/8 text-balance text-gray-700">
              Unser Fuhrpark ist das Herzstück unserer täglichen Arbeit. Mit
              modernen Maschinen und Fahrzeugen sorgen wir für präzise, sichere
              und termingerechte Umsetzung sämtlicher Tiefbau- und
              Kabelbauprojekte. Jede Maschine wird regelmäßig gewartet und ist
              auf dem neuesten Stand der Technik.
            </p>
          </div>
          <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            <div className="lg:pr-8">
              <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
                Unser Anspruch
              </h2>
              <p className="mt-6 text-base/7 text-gray-600">
                Wir setzen auf Qualität, Zuverlässigkeit und Nachhaltigkeit –
                auch bei unserem Fuhrpark. Vom leistungsstarken Bagger über
                Radlader bis hin zu Kabel- und Rohrziehgeräten: Unsere
                Ausstattung ermöglicht flexible Lösungen für jede Anforderung im
                Tief- und Leitungsbau. Durch gezielte Investitionen in moderne,
                emissionsarme Fahrzeuge tragen wir zudem aktiv zum Umweltschutz
                bei.
              </p>
              <h2 className="mt-8 text-2xl font-semibold tracking-tight text-pretty text-gray-900">
                Der Fuhrpark im Überblick
              </h2>
              <ul className="list-disc ml-6 mt-6 space-y-2">
                <li>
                  <strong>3 Bagger und Minibagger</strong> – für präzise
                  Erdarbeiten und Grabungen jeder Größe
                </li>
                <li>
                  <strong>4 Radlader und Transportfahrzeuge</strong> – für
                  effiziente Materiallogistik auf der Baustelle
                </li>
                <li>
                  <strong>5 Kabel- und Rohrziehgeräte</strong> – für sichere und
                  schonende Verlegung von Leitungen
                </li>
                <li>
                  <strong>2 Press- und Bohrsysteme</strong> – für grabenlose
                  Durchführungen und Hausanschlüsse
                </li>
                <li>
                  <strong>1 Service- und Montagefahrzeuge</strong> – optimal
                  ausgestattet für jeden Einsatz
                </li>
              </ul>
            </div>
            <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
              <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 xl:gap-8">
                <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                  <img
                    alt=""
                    src={machines1}
                    className="block size-full object-cover"
                  />
                </div>
                <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                  <img
                    alt=""
                    src={machines2}
                    className="block size-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                  <img
                    alt=""
                    src={machines3}
                    className="block size-full object-cover"
                  />
                </div>
                <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                  <img
                    alt=""
                    src={machines4}
                    className="block size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-gray-500">
              Zahlen, die bewegen
            </p>
            <hr className="mt-6 border-t border-gray-200" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-gray-600">
                  Fahrzeuge und Maschinen im Einsatz
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900">
                  <span>25+</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-gray-600">
                  Meter Kabel jährlich verlegt
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900">
                  <span>10.000+</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
                <dt className="text-sm/6 text-gray-600">
                  Baustellen pro Jahr erfolgreich abgeschlossen
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900">
                  <span>50+</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2">
                <dt className="text-sm/6 text-gray-600">
                  Einsatzbereit – dank regelmäßiger Wartung und moderner Technik
                </dt>
                <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900">
                  <span>100%</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
