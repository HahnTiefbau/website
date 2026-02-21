import group1 from '../assets/group_1.jpg';
import about_us_ceo from '../assets/about_us_ceo.jpg';
import about_us_management from '../assets/about_us_management.jpg';
import about_us_office from '../assets/about_us_office.jpg';
import convoy_despotoski from '../assets/convoy_despotoski.jpg';
import convoy_galanos from '../assets/convoy_galanos.jpg';
import convoy_huber from '../assets/convoy_huber.jpg';
import convoy_kern from '../assets/convoy_kern.jpg';
import convoy_lobes from '../assets/convoy_lobes.jpg';
import convoy_prigl from '../assets/convoy_prigl.jpg';
import convoy_tokic from '../assets/convoy_tokic.jpg';
import convoy_vukovic from '../assets/convoy_vukovic.jpg';
// import about_us_job_offers from '../assets/about_us_job_offers.jpg';
import about_us_galery_1 from '../assets/about_us_galery_1.jpg';
import about_us_galery_2 from '../assets/about_us_galery_2.jpg';
import about_us_galery_3 from '../assets/about_us_galery_3.jpg';
import about_us_galery_4 from '../assets/about_us_galery_4.jpg';
import machines_3 from '../assets/machines_3.jpg';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { Link } from '../../catalyst-components/link';
import { Trans, useTranslation } from 'react-i18next';
import { ListReveal } from '../core/components/ListReveal';
import { Reveal } from '../core/components/Reveal';
import { Seo } from '../core/components/Seo';

const teamManagement = [
  {
    header: 'about_us.ceo_header',
    image: about_us_ceo,
    member: [
      {
        text: 'about_us.ceo_member_1',
      },
      {
        text: 'about_us.ceo_member_2',
      },
    ],
  },
  {
    header: 'about_us.management_header',
    image: about_us_management,
    member: [
      {
        text: 'about_us.management_member_1',
      },
      {
        text: 'about_us.management_member_2',
      },
    ],
  },
  {
    header: 'about_us.office_header',
    image: about_us_office,
    member: [
      {
        text: 'about_us.office_member_1',
      },
      {
        text: 'about_us.office_member_2',
      },
    ],
  },
];

const convoys = [
  {
    header: 'about_us.convoy_prigl_header',
    image: convoy_prigl,
    member: [
      {
        text: 'about_us.convoy_prigl_member_1',
      },
      {
        text: 'about_us.convoy_prigl_member_2',
      },
      {
        text: 'about_us.convoy_prigl_member_3',
      },
    ],
  },
  {
    header: 'about_us.convoy_galanos_header',
    image: convoy_galanos,
    member: [
      {
        text: 'about_us.convoy_galanos_member_1',
      },
      {
        text: 'about_us.convoy_galanos_member_2',
      },
    ],
  },
  {
    header: 'about_us.convoy_lobes_header',
    image: convoy_lobes,
    member: [
      {
        text: 'about_us.convoy_lobes_member_1',
      },
      {
        text: 'about_us.convoy_lobes_member_2',
      },
      {
        text: 'about_us.convoy_lobes_member_3',
      },
    ],
  },
  {
    header: 'about_us.convoy_despotoski_header',
    image: convoy_despotoski,
    member: [
      {
        text: 'about_us.convoy_despotoski_member_1',
      },
      {
        text: 'about_us.convoy_despotoski_member_2',
      },
      {
        text: 'about_us.convoy_despotoski_member_3',
      },
    ],
  },
  {
    header: 'about_us.convoy_tokic_header',
    image: convoy_tokic,
    member: [
      {
        text: 'about_us.convoy_tokic_member_1',
      },
      {
        text: 'about_us.convoy_tokic_member_2',
      },
      {
        text: 'about_us.convoy_tokic_member_3',
      },
    ],
  },
  {
    header: 'about_us.convoy_huber_header',
    image: convoy_huber,
    member: [
      {
        text: 'about_us.convoy_huber_member_1',
      },
      {
        text: 'about_us.convoy_huber_member_2',
      },
      {
        text: 'about_us.convoy_huber_member_3',
      },
    ],
  },
  {
    header: 'about_us.convoy_kern_header',
    image: convoy_kern,
    member: [
      {
        text: 'about_us.convoy_kern_member_1',
      },
      {
        text: 'about_us.convoy_kern_member_2',
      },
    ],
  },
  {
    header: 'about_us.convoy_vukovic_header',
    image: convoy_vukovic,
    member: [
      {
        text: 'about_us.convoy_vukovic_member_1',
      },
      {
        text: 'about_us.convoy_vukovic_member_2',
      },
      {
        text: 'about_us.convoy_vukovic_member_3',
      },
    ],
  },
];

const missing = [
  { text: 'about_us.missing_staff_1' },
  { text: 'about_us.missing_staff_2' },
  { text: 'about_us.missing_staff_3' },
  { text: 'about_us.missing_staff_4' },
  { text: 'about_us.missing_staff_5' },
  { text: 'about_us.missing_staff_6' },
  { text: 'about_us.missing_staff_7' },
];

/*
const jobOffers = [
  {
    header: 'about_us.job_offer_1',
    text: 'about_us.job_offer_1_text',
    href: '/jobs/job_1',
  },
  {
    header: 'about_us.job_offer_2',
    text: 'about_us.job_offer_2_text',
    href: '/jobs/job_2',
  },
  {
    header: 'about_us.job_offer_3',
    text: 'about_us.job_offer_3_text',
    href: '/jobs/job_3',
  },
];
*/

export function AboutUsPage() {
  const { t } = useTranslation();
  const jobsRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const shouldScroll = searchParams.get('scroll') === 'jobs';

  useEffect(() => {
    if (shouldScroll && jobsRef.current) {
      jobsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      const newUrl = location.pathname + location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, [shouldScroll]);

  return (
    <>
      <Seo
        title={t('about_us.seo_title')}
        description={t('about_us.seo_description')}
        canonicalPath="/about"
      />
      <div className="relative isolate -z-10">
        <div className="relative isolate -z-10">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-accent-primary/30"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg
              x="50%"
              y={-1}
              className="overflow-visible fill-accent-primary/20"
            >
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
              className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#ff6600] to-[#40332c] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-30 pb-32 sm:pt-38 lg:px-8 lg:pt-40">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <Reveal
                  as="div"
                  from="left"
                  cacheKey="about-intro-block"
                  className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl"
                >
                  <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                    {t('about_us.intro_title')}
                  </h1>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                    {t('about_us.intro_text')}
                  </p>
                </Reveal>

                <Reveal
                  as="div"
                  from="right"
                  cacheKey="about-gallery-grid"
                  className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
                >
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                    <div className="relative">
                      <img
                        alt=""
                        src={about_us_galery_4}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>

                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt=""
                        src={about_us_galery_3}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src={about_us_galery_1}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>

                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt=""
                        src={machines_3}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src={about_us_galery_2}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            alt=""
            src={group1}
            className="aspect-5/2 w-full object-cover outline-1 -outline-offset-1 outline-black/5 xl:rounded-3xl"
          />
        </div>

        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
          <Reveal
            as="div"
            from="left"
            cacheKey="about-team-intro"
            className="max-w-2xl lg:mx-0"
          >
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              {t('about_us.our_team_header')}
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              {t('about_us.our_team_text')}
            </p>
          </Reveal>

          <Reveal
            as="h2"
            from="up"
            distance={0}
            cacheKey="about-management-h2-fade"
            className="text-2xl mt-12 font-semibold tracking-tight text-pretty text-gray-900"
          >
            {t('about_us.management')}
          </Reveal>

          <ul
            role="list"
            className="
                mx-auto mt-8 grid max-w-7xl gap-x-8 gap-y-10 text-center
                grid-cols-2 md:grid-cols-3 lg:grid-cols-3
              "
          >
            {teamManagement.map((group, i) => (
              <ListReveal
                key={group.header}
                cacheKey={group.header}
                delay={i * 0.08}
              >
                <li key={group.header}>
                  <div>
                    <dt className="mb-2 font-semibold text-gray-900">
                      {t(group.header)}
                    </dt>

                    <img
                      alt={group.header}
                      src={group.image}
                      className="w-full aspect-square rounded-2xl object-cover shadow-md"
                    />

                    <dd className="mt-4 text-gray-600 text-left">
                      <ul className="list-disc pl-5 space-y-1">
                        {group.member.map(member => (
                          <li key={member.text}>
                            <Trans
                              i18nKey={member.text}
                              components={{ bold: <strong /> }}
                            />
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </li>
              </ListReveal>
            ))}
          </ul>
          <Reveal
            as="h2"
            from="up"
            distance={0}
            cacheKey="about-convoys-h2-fade"
            className="text-2xl mt-12 font-semibold tracking-tight text-pretty text-gray-900"
          >
            {t('about_us.convoys')}
          </Reveal>

          <ul
            role="list"
            className="
                mx-auto mt-8 grid max-w-7xl gap-x-8 gap-y-10 text-center
                grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
              "
          >
            {convoys.map((convoy, i) => (
              <ListReveal
                key={convoy.header}
                cacheKey={convoy.header}
                delay={i * 0.08}
              >
                <li key={convoy.header}>
                  <div>
                    <dt className="mb-2 font-semibold text-gray-900">
                      {t(convoy.header)}
                    </dt>
                    <img
                      alt={t(convoy.header)}
                      src={convoy.image}
                      className="w-full aspect-square rounded-2xl object-cover shadow-md"
                    />
                    <dd className="mt-3 text-gray-600 text-left">
                      <ul className="list-disc pl-5 space-y-1">
                        {convoy.member.map(member => (
                          <li key={member.text}>
                            <Trans
                              i18nKey={member.text}
                              components={{ bold: <strong /> }}
                            />
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </li>
              </ListReveal>
            ))}
          </ul>
          <p className="text-gray-600 mt-8 mb-24">
            <span className="text-gray-600">
              {t('about_us.missing_header')}
            </span>

            {missing.map((item, index) => (
              <ListReveal
                key={item.text}
                cacheKey={`missing-${item.text}`}
                delay={index * 0.06}
                className="inline"
              >
                <span>
                  <Trans
                    i18nKey={item.text}
                    components={{
                      bold: <strong className="font-semibold text-gray-600" />,
                    }}
                  />
                  {index < missing.length - 1 && ', '}
                </span>
              </ListReveal>
            ))}
          </p>
        </div>
        {/**
        <div
          ref={jobsRef}
          className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8 mb-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
              <Reveal
                as="div"
                from="left"
                cacheKey="about-become-part-block"
                className="w-full lg:max-w-lg lg:flex-auto"
              >
                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  {t('about_us.become_part_header')}
                </h2>
                <p className="mt-6 text-xl/8 text-gray-600">
                  {t('about_us.become_part_text')}
                </p>
                <img
                  alt=""
                  src={about_us_job_offers}
                  className="mt-16 w-full h-auto rounded-2xl outline-1 -outline-offset-1 outline-black/5"
                />
              </Reveal>

              <div className="w-full lg:max-w-xl lg:flex-auto">
                <h3 className="sr-only">Job openings</h3>
                <ul className="-my-8 divide-y divide-gray-100">
                  {jobOffers.map((offer, index) => (
                    <Reveal
                      key={offer.text}
                      as="li"
                      from="up"
                      distance={0}
                      delay={index * 0.08}
                      cacheKey={`joboffer-${offer.href}`}
                      className="py-8"
                    >
                      <dl className="relative flex flex-wrap gap-x-3">
                        <dt className="sr-only">Role</dt>
                        <dd className="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                          <Link href={offer.href}>
                            {t(offer.header)}
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                          </Link>
                        </dd>

                        <dt className="sr-only">Description</dt>
                        <dd className="mt-2 w-full flex-none text-base/7 text-gray-600">
                          {t(offer.text)}
                        </dd>

                        <Link
                          href={offer.href}
                          className="text-sm/6 mt-2 font-semibold text-accent-primary"
                        >
                          {t('about_us.learn_more_and_apply')}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </dl>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
         **/}
      </div>
    </>
  );
}
