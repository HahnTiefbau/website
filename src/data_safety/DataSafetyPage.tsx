import { useTranslation } from 'react-i18next';
import { Text } from '../../catalyst-components/text';
import { Link } from '../../catalyst-components/link';

export function DataSafetyPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background-white-gray font-sans mt-12">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <Text className="text-text text-4xl font-bold">
            {t('footer.data_safety')}
          </Text>
          <div className="w-24 h-1 mt-4 bg-accent-primary mx-auto rounded-full" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <Text className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {t('data_safety_page.section_1_header')}
          </Text>

          <Text className="mt-6 text-xl/8 text-text-secondary">
            {t('data_safety_page.section_1_text')}
          </Text>
          <Text className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-text">
            {t('data_safety_page.section_2_header')}
          </Text>
          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_2_text')}
          </Text>
          <address className="mt-6 not-italic text-gray-700 gap">
            <Text className="mt-6 text-text-secondary text-base/7 font-semibold">
              {t('general.company_name')}
            </Text>
            <Text className="text-text-secondary text-base/7">
              {t('general.company_street')}
            </Text>
            <Text className="text-text-secondary text-base/7">
              {t('general.company_city')}
            </Text>
            <Text className="text-text-secondary text-base/7">
              {t('general.germany')}
            </Text>
            <Link href={`mailto:${t('company_email')}`}>
              <Text className="text-accent-primary text-base/7 hover:underline">
                {t('general.company_email')}
              </Text>
            </Link>
          </address>
          <Text className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-text">
            {t('data_safety_page.section_3_header')}
          </Text>

          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_3_text_1')}
          </Text>
          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_3_text_1_2')}
          </Text>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            {[
              'data_safety_page.section_3_bullet_1',
              'data_safety_page.section_3_bullet_2',
              'data_safety_page.section_3_bullet_3',
              'data_safety_page.section_3_bullet_4',
              'data_safety_page.section_3_bullet_5',
            ].map((key, index) => (
              <li key={index}>
                <Text className="text-text-secondary text-base/7">
                  {t(key)}
                </Text>
              </li>
            ))}
          </ul>

          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_3_text_2')}
          </Text>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            {[
              'data_safety_page.section_3_bullet_6',
              'data_safety_page.section_3_bullet_7',
              'data_safety_page.section_3_bullet_8',
            ].map((key, index) => (
              <li key={index}>
                <Text className="text-text-secondary text-base/7">
                  {t(key)}
                </Text>
              </li>
            ))}
          </ul>

          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_3_text_3')}
          </Text>
          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_3_text_3_2')}
          </Text>

          <Text className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-text">
            {t('data_safety_page.section_4_header')}
          </Text>

          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_4_text_1')}
          </Text>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            {[
              'data_safety_page.section_4_bullet_1',
              'data_safety_page.section_4_bullet_2',
              'data_safety_page.section_4_bullet_3',
              'data_safety_page.section_4_bullet_4',
              'data_safety_page.section_4_bullet_5',
              'data_safety_page.section_4_bullet_6',
            ].map((key, index) => {
              const text = t(key);
              const highlighted = text.replace(
                /(gemäß\sArt\.\s\d+\sDSGVO)/g,
                '<strong>$1</strong>'
              );

              return (
                <li key={index}>
                  <Text
                    className="mt-6 text-text-secondary text-base/7"
                    dangerouslySetInnerHTML={{
                      __html: highlighted,
                    }}
                  ></Text>
                </li>
              );
            })}
          </ul>
          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_4_text_2')}
          </Text>

          <Text className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-text">
            {t('data_safety_page.section_5_header')}
          </Text>

          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_5_text')}
          </Text>
          <Text className="mt-6 text-text-secondary text-base/7">
            {t('data_safety_page.section_5_text_2')}
          </Text>
        </div>
      </div>
    </div>
  );
}
