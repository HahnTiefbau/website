import { useTranslation } from 'react-i18next';
import {
  MapPinIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';
import { Text } from '../../catalyst-components/text';

export function ImprintPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background-white-gray font-sans mt-12">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <Text className="text-text-900 text-4xl font-bold">
            {t('imprint.title')}
          </Text>
          <div className="w-24 h-1 mt-4 bg-accent-primary mx-auto rounded-full" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <section className="mb-8">
            <div className="flex items-center mb-6">
              <Text className="text-text-900 text-2xl font-semibold">
                {t('imprint.title_1')}
              </Text>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="space-y-3">
                <Text className="text-text-900 text-lg font-medium">
                  Ludwig Hahn Tiefbau-Kabelbau GmbH
                </Text>
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-text-700 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <Text className="text-text-700 text-base">
                      {t('general.company_street')}
                    </Text>
                    <Text className="text-text-700 text-base">
                      {t('general.company_city')}
                    </Text>
                    <Text className="text-text-700 text-base">
                      {t('general.germany')}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent-primary/15 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-accent-primary mr-3 flex-shrink-0" />
                  <Text className="text-text-900 text-lg font-semibold">
                    {t('imprint.register_entry')}
                  </Text>
                </div>
                <Text className="text-text-700 text-base mb-1">
                  {t('imprint.company_register_court')}
                </Text>
                <Text className="text-text-700 text-base mb-1">
                  {t('imprint.company_hrb_nr')}
                </Text>
                <Text className="text-text-700 text-base">
                  {t('imprint.company_ust_id')}
                </Text>
              </div>

              <div className="bg-accent-primary/15 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <EnvelopeIcon className="h-6 w-6 text-accent-primary mr-3 flex-shrink-0" />
                  <Text className="text-text-900 text-lg font-semibold">
                    {t('general.email')}
                  </Text>
                </div>
                <Text className="text-text-700 text-base">
                  {t('general.company_email')}
                </Text>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-xl p-6 mb-10 shadow-sm">
            <div className="space-y-3">
              <Text className="text-text-900 text-lg font-semibold">
                {t('imprint.ceo')}
              </Text>
              <div>
                <Text className="text-text-700 text-base">
                  {t('imprint.ceo_1')}
                </Text>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <div className="flex items-center mb-6">
              <Text className="text-text-900 text-2xl font-semibold">
                {t('imprint.title_2')}
              </Text>
            </div>

            <div className="space-y-8">
              <div>
                <Text className="text-text-900 text-xl font-semibold mb-3">
                  {t('imprint.title_2_1')}
                </Text>
                <Text className="text-text-700 text-base leading-relaxed text-justify">
                  {t('imprint.text_2_1')}
                </Text>
              </div>

              <div>
                <Text className="text-text-900 text-xl font-semibold mb-3">
                  {t('imprint.title_2_2')}
                </Text>
                <Text className="text-text-700 text-base leading-relaxed text-justify">
                  {t('imprint.text_2_2')}
                </Text>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
