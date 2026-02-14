import {
  BoltIcon,
  MinusCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

import machines1 from '../assets/machines_1.jpg';
import machines2 from '../assets/machines_2.jpg';
import machines3 from '../assets/machines_3.jpg';
import machines4 from '../assets/machines_4.jpg';
import { Trans, useTranslation } from 'react-i18next';
import { ListReveal } from '../core/components/ListReveal';
import { Reveal } from '../core/components/Reveal';
import { Seo } from '../core/components/Seo';

const primaryFeatures = [
  {
    name: 'services.attribute_1_header',
    description: 'services.attribute_1_text',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'services.attribute_2_header',
    description: 'services.attribute_2_text',
    icon: MinusCircleIcon,
  },
  {
    name: 'services.attribute_3_header',
    description: 'services.attribute_3_text',
    icon: BoltIcon,
  },
];

const fleet_overview_points = [
  'services.fleet_overview_point_1',
  'services.fleet_overview_point_2',
  'services.fleet_overview_point_3',
  'services.fleet_overview_point_4',
  'services.fleet_overview_point_5',
  'services.fleet_overview_point_6',
  'services.fleet_overview_point_7',
];

export function ServicesPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title={t('services.seo_title')}
        description={t('services.seo_description')}
        canonicalPath="/services"
      />
      <div className="relative isolate -z-10">
        <div className="mx-auto mt-30 max-w-7xl px-6 sm:mt-38 lg:px-8">
          <Reveal
            as="div"
            from="up"
            cacheKey="services-intro-block"
            className="mx-auto max-w-2xl lg:text-center"
          >
            <p className="mt-2 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl lg:text-balance">
              {t('services.intro_header')}
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
              {t('services.intro_text')}
            </p>
          </Reveal>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {primaryFeatures.map((feature, i) => (
                <ListReveal
                  key={feature.name}
                  cacheKey={feature.name}
                  delay={i * 0.16}
                >
                  <div key={feature.name} className="flex flex-col">
                    <dt className="text-base/7 font-semibold text-gray-900">
                      <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-accent-primary">
                        <feature.icon
                          aria-hidden="true"
                          className="size-6 text-white"
                        />
                      </div>
                      {t(feature.name)}
                    </dt>
                    <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-600">
                      <p className="flex-auto">{t(feature.description)}</p>
                    </dd>
                  </div>
                </ListReveal>
              ))}
            </dl>
          </div>
        </div>
        <div className="overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <Reveal
              as="div"
              from="left"
              cacheKey="services-company-fleet-block"
              className="max-w-4xl"
            >
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {t('services.company_fleet_header')}
              </h1>
              <p className="mt-6 text-xl/8 text-balance text-gray-700">
                {t('services.company_fleet_text')}
              </p>
            </Reveal>

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
              <Reveal
                as="div"
                from="left"
                cacheKey="services-claim-and-fleet-overview"
                className="lg:pr-8"
              >
                <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
                  {t('services.our_claim_header')}
                </h2>
                <p className="mt-6 text-base/7 text-gray-600">
                  {t('services.our_claim_text')}
                </p>

                <h2 className="mt-8 text-2xl font-semibold tracking-tight text-pretty text-gray-900">
                  {t('services.fleet_overview_header')}
                </h2>
                <ul className="list-disc ml-6 mt-6 space-y-2">
                  {fleet_overview_points.map(key => (
                    <li key={key}>
                      <Trans i18nKey={key} components={{ bold: <strong /> }} />
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal
                as="div"
                from="right"
                cacheKey="services-machines-grid"
                className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto"
              >
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
              </Reveal>
            </section>

            <div className="mt-16 lg:col-span-1">
              <p className="text-base/7 font-semibold text-gray-500">
                {t('services.numbers_header')}
              </p>
              <hr className="mt-6 border-t border-gray-200" />
              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <ListReveal
                  key={'services_point_1'}
                  cacheKey={'services_point_1'}
                >
                  <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                    <dt className="text-sm/6 text-gray-600">
                      <span>{t('services.numbers_point_1_description')}</span>
                    </dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900">
                      <span>{t('services.numbers_point_1_value')}</span>
                    </dd>
                  </div>
                </ListReveal>
                <ListReveal
                  key={'services_point_2'}
                  cacheKey={'services_point_2'}
                >
                  <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                    <dt className="text-sm/6 text-gray-600">
                      <span>{t('services.numbers_point_2_description')}</span>
                    </dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900">
                      <span>{t('services.numbers_point_2_value')}</span>
                    </dd>
                  </div>
                </ListReveal>
                <ListReveal
                  key={'services_point_3'}
                  cacheKey={'services_point_3'}
                >
                  <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
                    <dt className="text-sm/6 text-gray-600">
                      <span>{t('services.numbers_point_3_description')}</span>
                    </dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900">
                      <span>{t('services.numbers_point_3_value')}</span>
                    </dd>
                  </div>
                </ListReveal>
                <ListReveal
                  key={'services_point_4'}
                  cacheKey={'services_point_4'}
                >
                  <div className="flex flex-col gap-y-2">
                    <dt className="text-sm/6 text-gray-600">
                      <span>{t('services.numbers_point_4_description')}</span>
                    </dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-gray-900">
                      <span>{t('services.numbers_point_4_value')}</span>
                    </dd>
                  </div>
                </ListReveal>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
