import { BuildingOffice2Icon, PhoneIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { Button } from '../../catalyst-components/button';

const jobOpenings = [
  {
    id: 1,
    role: 'Bauleiter Tief- und Kabelbau (m/w/d)',
    href: '#',
    description:
      'Verantwortung für die technische und wirtschaftliche Abwicklung von Bauprojekten, Koordination der Baustellenabläufe sowie Abstimmung mit Auftraggebern und Nachunternehmern.',
    salary: '$75,000 USD',
    location: 'San Francisco, CA',
  },
  {
    id: 2,
    role: 'Polier / Vorarbeiter (m/w/d)',
    href: '#',
    description:
      'Organisation und Leitung der Baustellen im Tief- und Kabelbau, Einteilung der Mitarbeiter und Sicherstellung eines reibungslosen Arbeitsablaufs.',
    salary: '$125,000 USD',
    location: 'San Francisco, CA',
  },
  {
    id: 3,
    role: 'Facharbeiter Tief- und Kabelbau (m/w/d)',
    href: '#',
    description:
      'Durchführung von Tiefbau- und Kabelverlegearbeiten, Bedienung von Baumaschinen sowie Unterstützung bei Bauvorbereitungen und -abschlüssen.',
    salary: '$105,000 USD',
    location: 'San Francisco, CA',
  },
];

export function JobOffersPage() {
  return (
    <div className="relative isolate -z-10">
      <div className="relative isolate -z-10">
        <div className="relative isolate px-6 py-16 sm:py-24 lg:px-8 bg-white">
          <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
              <div className="w-full lg:max-w-lg lg:flex-auto">
                <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl dark:text-white">
                  Wir suchen engagierte Fachkräfte für unser Bauunternehmen
                </h2>
                <p className="mt-6 text-xl/8 text-gray-600 dark:text-gray-400">
                  Zur Verstärkung unseres Teams suchen wir qualifizierte und
                  zuverlässige Mitarbeiterinnen und Mitarbeiter. Wir bieten
                  Ihnen eine sichere Anstellung, moderne Arbeitsbedingungen und
                  abwechslungsreiche Projekte in der Region.
                </p>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
                  className="mt-16 aspect-6/5 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 lg:aspect-auto lg:h-138 dark:outline-white/10"
                />
              </div>
              <div className="w-full lg:max-w-xl lg:flex-auto">
                <h3 className="sr-only">Job openings</h3>
                <ul className="-my-8 divide-y divide-gray-100 dark:divide-gray-800">
                  {jobOpenings.map(opening => (
                    <li key={opening.id} className="py-8">
                      <dl className="relative flex flex-wrap gap-x-3">
                        <dt className="sr-only">Role</dt>
                        <dd className="w-full flex-none text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                          <a href={opening.href}>
                            {opening.role}
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                          </a>
                        </dd>
                        <dt className="sr-only">Description</dt>
                        <dd className="mt-2 w-full flex-none text-base/7 text-gray-600 dark:text-gray-400">
                          {opening.description}
                        </dd>
                        <a
                          href="#"
                          className="text-sm/6 mt-2 font-semibold text-accent-primary"
                        >
                          Erfahre mehr <span aria-hidden="true">→</span>
                        </a>
                      </dl>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative isolate bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2 dark:bg-gray-900 dark:ring-white/10">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10"
                >
                  <defs>
                    <pattern
                      x="100%"
                      y={-1}
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    className="fill-white dark:fill-gray-900"
                  />
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-gray-50 dark:fill-gray-800/20"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                </svg>
                <div
                  aria-hidden="true"
                  className="absolute top-[calc(100%-13rem)] -left-56 hidden transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))] dark:block"
                >
                  <div
                    style={{
                      clipPath:
                        'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                    }}
                    className="aspect-1155/678 w-288.75 bg-linear-to-br from-[#80caff] to-[#4f46e5] opacity-10 dark:opacity-20"
                  />
                </div>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                Kontaktieren Sie uns
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
                Sie haben Interesse an einer unserer Stellen oder möchten mehr
                über uns erfahren? Kontaktieren Sie uns gerne telefonisch, per
                E-Mail oder über das Kontaktformular – wir freuen uns auf Ihre
                Nachricht. <br />
                <br />
                Wenn Sie sich direkt bewerben möchten, wählen Sie einfach die
                entsprechende Stellenausschreibung aus und nutzen Sie das
                Bewerbungsformular.
              </p>
              <dl className="mt-10 space-y-4 text-base/7 text-gray-600 dark:text-gray-300">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon
                      aria-hidden="true"
                      className="h-7 w-6 text-accent-primary"
                    />
                  </dt>
                  <dd>
                    Ludwig Hahn Tief- & Kabelbau GmbH
                    <br />
                    Winnender Str. 1
                    <br />
                    71522 Backnang
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-accent-primary"
                    />
                  </dt>
                  <dd>
                    <a
                      href="tel: 07191 32220"
                      className="text-accent-primary hover:text-orange-600"
                    >
                      07191 32220
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-accent-primary"
                    />
                  </dt>
                  <dd>
                    <a
                      href="mailto:info@hahn-tief-kabelbau.de"
                      className="text-accent-primary hover:text-orange-600"
                    >
                      info@hahn-tief-kabelbau.de
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <form
            action="#"
            method="POST"
            className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="tel"
                      autoComplete="tel"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button color={'orange'}>Nachricht senden</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
