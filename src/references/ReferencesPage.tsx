import syna_logo from '../assets/syna_logo_white.svg';
import kabel_bw_logo from '../assets/kabelbw_logo_white.svg';
import netze_bw_logo from '../assets/netze_bw_logo_white.svg';
import stadtwerke_lubu_logo from '../assets/stadtwerke_lubu_logo_white.svg';
import spie_logo from '../assets/spie_logo_white.svg';
import telekom_logo from '../assets/telekom_logo_white.svg';
import stadtwerke_bk_logo from '../assets/stadtwerke_bk_logo_white.svg';
import project_1 from '../assets/project_1.jpg';
import project_2 from '../assets/project_2.jpg';
import project_3 from '../assets/project_3.jpg';
import { Trans, useTranslation } from 'react-i18next';
import { Reveal } from '../core/components/Reveal';
import { ListReveal } from '../core/components/ListReveal';
import { Seo } from '../core/components/Seo';

const projects = [
  {
    id: 'references.project_1',
    initiator: 'references.project_1_initiator',
    place: 'references.project_1_place',
    todo: 'references.project_1_todo',
    img: project_1,
  },
  {
    id: 'references.project_2',
    initiator: 'references.project_2_initiator',
    place: 'references.project_2_place',
    todo: 'references.project_2_todo',
    img: project_2,
  },
  {
    id: 'references.project_3',
    initiator: 'references.project_3_initiator',
    place: 'references.project_3_place',
    todo: 'references.project_3_todo',
    img: project_3,
  },
];

export function ReferencesPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title={t('references.seo_title')}
        description={t('references.seo_description')}
        canonicalPath="/references"
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
              {t('references.projects_title')}
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
              {t('references.projects_text')}
            </p>
          </Reveal>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {projects.map((project, i) => (
              <ListReveal
                key={project.id}
                cacheKey={project.id}
                delay={i * 0.08}
              >
                <div>
                  <div className="relative isolate overflow-hidden rounded-2xl bg-gray-800 aspect-[3/4]">
                    <img
                      alt=""
                      src={project.img}
                      className="absolute inset-0 -z-10 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/40" />
                    <div className="absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-white/10" />
                  </div>

                  <p className="mt-4 lg:mt-6 text-base/7 text-gray-600">
                    <Trans
                      i18nKey={project.place}
                      components={{ bold: <strong /> }}
                    />
                  </p>
                  <p className="mt-3 lg:mt-4 text-base/7 text-gray-600">
                    <Trans
                      i18nKey={project.initiator}
                      components={{ bold: <strong /> }}
                    />
                  </p>
                  <p className="mt-3 lg:mt-4 text-base/7 text-gray-600">
                    <Trans
                      i18nKey={project.todo}
                      components={{ bold: <strong /> }}
                    />
                  </p>
                </div>
              </ListReveal>
            ))}
          </div>
        </div>
        <div className="mx-auto my-24 max-w-7xl sm:mt-32 sm:px-6 lg:px-8">
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
      </div>
    </>
  );
}
