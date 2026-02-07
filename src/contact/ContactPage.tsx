import { BuildingOffice2Icon, PhoneIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { Button } from '../../catalyst-components/button';
import { Link } from '../../catalyst-components/link';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { useNotifications } from '../core/util/state/notification/useNotification';
import { CircularProgressIndicator } from '../core/components/CircularProogressIndicator';
import { Reveal } from '../core/components/Reveal';

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const initialState: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  website: ''
};

export function ContactPage() {
  const { t } = useTranslation();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState<ContactFormState>(initialState);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof ContactFormState, string>> = {};
    if (!form.firstName.trim()) e.firstName = t('general.required_field');
    if (!form.lastName.trim()) e.lastName = t('general.required_field');

    if (!form.email.trim()) e.email = t('general.required_field');
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = t('general.invalid_email');

    if (!form.message.trim()) e.message = t('general.required_field');
    return e;
  }, [form, t]);

  function setField<K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  const isValid = Object.keys(errors).length === 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSending) return;
    setSubmittedOnce(true);
    if (!isValid) return;

    try {
      setIsSending(true);

      const res = await fetch('/app/api/send_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: new URLSearchParams({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
          website: form.website
        }).toString(),
      });

      const data = (await res.json().catch(() => null)) as
          | { success: boolean; error?: string }
          | null;

      if (res.status === 429) {
        addNotification({
          type: 'error',
          title: t('contact.contact_form'),
          message: t('general.too_much_requests_wait'),
          showTimeInMs: 5000,
        });
        return;
      }

      if (!res.ok || !data?.success) {
        console.error(data?.error);
        throw new Error(data?.error ?? 'Unknown error');
      }

      addNotification({
        type: 'success',
        title: t('contact.contact_form'),
        message: t('contact.thanks_for_your_message'),
        showTimeInMs: 4000,
      });

      setForm(initialState);
      setSubmittedOnce(false);
    } catch (error) {
      console.error(error);
      addNotification({
        type: 'error',
        title: t('contact.contact_form'),
        message: t('contact.could_not_submit_message'),
        showTimeInMs: 5000,
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="relative isolate -z-10">
      <div className="relative isolate bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 min-h-screen lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48 h-full">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
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
                    className="fill-white"
                  />
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-gray-50"
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
                  className="absolute top-[calc(100%-13rem)] -left-56 hidden transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
                >
                  <div
                    style={{
                      clipPath:
                        'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                    }}
                    className="aspect-1155/678 w-288.75 bg-linear-to-br from-[#80caff] to-[#4f46e5] opacity-10"
                  />
                </div>
              </div>
              <Reveal
                as="div"
                from="up"
                distance={0}
                cacheKey="contact-left-block-fade"
              >
                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  {t('contact.title')}
                </h2>

                <p className="mt-6 text-lg/8 text-gray-600">
                  {t('contact.text_1')}
                </p>

                <p className="mt-6 text-lg/8 text-gray-600">
                  {t('contact.text_2_1')}
                  <Link
                    href="/about?scroll=jobs"
                    className="font-semibold text-accent-primary hover:text-orange-600"
                  >
                    {t('contact.text_2_2')}
                  </Link>{' '}
                  {t('contact.text_2_3')}
                </p>

                <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <BuildingOffice2Icon
                        aria-hidden="true"
                        className="h-7 w-6 text-accent-primary"
                      />
                    </dt>
                    <dd>
                      Ludwig Hahn Tief- &amp; Kabelbau GmbH
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
                      <Link
                        href="tel: 07191 32220"
                        className="text-accent-primary hover:text-orange-600"
                      >
                        07191 32220
                      </Link>
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
                      <Link
                        href="mailto:info@hahn-tief-kabelbau.de"
                        className="text-accent-primary hover:text-orange-600"
                      >
                        info@hahn-tief-kabelbau.de
                      </Link>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>

          <Reveal
            as="form"
            from="up"
            distance={0}
            cacheKey="contact-form"
            onSubmit={onSubmit}
            method="POST"
            className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {t('contact.contact_form')}
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    {t('general.surname')}*
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={e => setField('firstName', e.target.value)}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-1 focus:-outline-offset-2 focus:outline-accent-primary"
                    />
                    {submittedOnce && errors.firstName && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    {t('general.last_name')}*
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={e => setField('lastName', e.target.value)}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-1 focus:-outline-offset-2 focus:outline-accent-primary"
                    />
                    {submittedOnce && errors.lastName && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    {t('general.email')}*
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={e => setField('email', e.target.value)}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-1 focus:-outline-offset-2 focus:outline-accent-primary"
                    />
                    {submittedOnce && errors.email && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    {t('general.phone_number')}
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={e => setField('phone', e.target.value)}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-1 focus:-outline-offset-2 focus:outline-accent-primary"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    {t('general.message')}*
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={e => setField('message', e.target.value)}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-1 focus:-outline-offset-2 focus:outline-accent-primary"
                    />
                    {submittedOnce && errors.message && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs/6 text-gray-900 -my-2">
                  * {t('general.required_field')}
                </p>
              </div>

              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={e => setField('website', e.target.value)}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  className="focus:outline-none"
                  color="orange"
                  type="submit"
                >
                  {isSending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CircularProgressIndicator />
                    </div>
                  )}
                  <span className={isSending ? 'invisible' : ''}>
                    {t('general.send_message')}
                  </span>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
