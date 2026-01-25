import syna_logo from '../assets/syna_logo_white.svg';
import kabel_bw_logo from '../assets/kabelbw_logo_white.svg';
import netze_bw_logo from '../assets/netze_bw_logo_white.svg';
import stadtwerke_lubu_logo from '../assets/stadtwerke_lubu_logo_white.svg';
import spie_logo from '../assets/spie_logo_white.svg';
import telekom_logo from '../assets/telekom_logo_white.svg';
import stadtwerke_bk_logo from '../assets/stadtwerke_bk_logo_white.svg';
import { Link } from '../../catalyst-components/link';
import { useTranslation } from 'react-i18next';
import { Reveal } from '../core/components/Reveal';
import { ListReveal } from '../core/components/ListReveal';

const blogPosts = [
  {
    id: 1,
    title: 'Vel expedita assumenda placeat aut nisi optio voluptates quas',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Libero quisquam voluptatibus nam iusto qui dolor',
    href: '#',
    description:
      'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    author: {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Asperiores mollitia et dolor autem modi sit eius quisquam',
    href: '#',
    description:
      'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    author: {
      name: 'Tom Cook',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

export function ReferencesPage() {
  const { t } = useTranslation();
  return (
    <div className="relative isolate -z-10">
      <div className="mx-auto mt-24 max-w-7xl sm:mt-32 sm:px-6 lg:px-8">
        <Reveal
          from="up"
          distance={0}
          as="div"
          cacheKey="logo-cloud"
          className="relative isolate overflow-hidden bg-background-gray px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16"
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('references.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-lg/8 text-gray-300">
            {t('references.text')}
          </p>
          <div className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-16">
            <img
              alt="Transistor"
              src={syna_logo}
              width={158}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <img
              alt="Tuple"
              src={netze_bw_logo}
              width={158}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <img
              alt="Palakrat"
              src={spie_logo}
              width={158}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <img
              alt="Reform"
              src={telekom_logo}
              width={158}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <img
              alt="SavvyCal"
              src={kabel_bw_logo}
              width={158}
              height={48}
              className="h-8 w-auto object-contain"
            />
            <img
              alt="Statamic"
              src={stadtwerke_lubu_logo}
              width={158}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <img
              alt="Perplex"
              src={stadtwerke_bk_logo}
              width={158}
              height={48}
              className="h-12 w-auto object-contain"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
          >
            <div
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
              className="aspect-1404/767 w-351 bg-linear-to-r from-[#f25c19] to-[#f25c19] opacity-50"
            />
          </div>
        </Reveal>
      </div>
      <div className="mx-auto my-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <Reveal
          as="div"
          from="left"
          cacheKey="references-projects-intro"
          className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            {t('references.projects_title')}
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            {t('references.projects_text')}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <ListReveal
              key={post.id}
              cacheKey={`ref-post-${post.id}`}
              delay={index * 0.08}
              className="h-full"
            >
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
                <img
                  alt=""
                  src={post.imageUrl}
                  className="absolute inset-0 -z-10 size-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                  <time dateTime={post.datetime} className="mr-8">
                    {post.date}
                  </time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg
                      viewBox="0 0 2 2"
                      className="-ml-0.5 size-0.5 flex-none fill-white/50"
                    >
                      <circle r={1} cx={1} cy={1} />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <img
                        alt=""
                        src={post.author.imageUrl}
                        className="size-6 flex-none rounded-full bg-white/10"
                      />
                      {post.author.name}
                    </div>
                  </div>
                </div>

                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                  <Link href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
              </article>
            </ListReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
