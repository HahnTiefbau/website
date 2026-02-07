import { Button } from '../../catalyst-components/button';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import job_1_img from '../assets/job_1.jpg';
import job_2_img from '../assets/machines_4.jpg';
import job_3_img from '../assets/machines_1.jpg';
import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useNotifications } from '../core/util/state/notification/useNotification';
import { CircularProgressIndicator } from '../core/components/CircularProogressIndicator';
import { Reveal } from '../core/components/Reveal';
import { ListReveal } from '../core/components/ListReveal';

const IMAGES: Record<string, string> = {
  job_1: job_1_img,
  job_2: job_2_img,
  job_3: job_3_img,
};

const TODOS_COUNT: Record<string, number> = { job_1: 4, job_2: 4, job_3: 6 };
const PROFILES_COUNT: Record<string, number> = { job_1: 4, job_2: 4, job_3: 6 };
const BENEFITS_COUNT: Record<string, number> = { job_1: 5, job_2: 5, job_3: 5 };

function bytesToMb(bytes: number, digits = 2) {
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(digits);
}

function isPdf(file: File) {
  const mimeOk = file.type === 'application/pdf';
  const extOk = file.name.toLowerCase().endsWith('.pdf');
  return mimeOk || extOk;
}

type ApplicationFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const initialState: ApplicationFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  website: ''
};

const MAX_FILES = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

export function JobPage() {
  const { t } = useTranslation();
  const { jobId } = useParams<{ jobId: string }>();
  const { addNotification } = useNotifications();

  const [attachments, setAttachments] = useState<File[]>([]);
  const [form, setForm] = useState<ApplicationFormState>(initialState);
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof ApplicationFormState, string>> = {};
    if (!form.firstName.trim()) e.firstName = t('general.required_field');
    if (!form.lastName.trim()) e.lastName = t('general.required_field');

    if (!form.email.trim()) e.email = t('general.required_field');
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = t('general.invalid_email');

    if (!form.message.trim()) e.message = t('general.required_field');
    return e;
  }, [form, t]);

  const isValidForm = Object.keys(errors).length === 0;

  function setField<K extends keyof ApplicationFormState>(
    key: K,
    value: ApplicationFormState[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function onSubmitApplication(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSending) return;

    setSubmittedOnce(true);
    if (!isValidForm) return;

    if (attachments.length > 5) {
      addNotification({
        type: 'error',
        title: t('general.application'),
        message: 'Maximal 5 PDF-Dateien erlaubt.',
        showTimeInMs: 5000,
      });
      return;
    }

    try {
      setIsSending(true);

      const fd = new FormData();
      const jobName = t(`jobs.${jobId}_header`);
      fd.append('jobName', jobName);
      fd.append('firstName', form.firstName);
      fd.append('lastName', form.lastName);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('message', form.message);
      fd.append('website', form.website);

      for (const file of attachments.slice(0, 5)) {
        fd.append('documents[]', file, file.name);
      }

      const res = await fetch('/api/send_application.php', {
        method: 'POST',
        body: fd,
      });

      const data = (await res.json().catch(() => null)) as
          | { success: boolean; error?: string }
          | null;

      if (res.status === 429) {
        addNotification({
          type: 'error',
          title: t('general.application'),
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
        title: t('general.application'),
        message: t('jobs.application_successfully_sent'),
        showTimeInMs: 4000,
      });

      setForm(initialState);
      setAttachments([]);
      setSubmittedOnce(false);
    } catch {
      addNotification({
        type: 'error',
        title: t('general.application'),
        message: t('jobs.application_could_not_be_sent'),
        showTimeInMs: 5000,
      });
    } finally {
      setIsSending(false);
    }
  }

  const onAttachmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const remainingSlots = Math.max(0, MAX_FILES - attachments.length);

    if (remainingSlots === 0) {
      addNotification({
        type: 'error',
        title: t('general.file_upload'),
        message: t('general.max_allowed_files_5'),
        showTimeInMs: 5000,
      });
      e.target.value = '';
      return;
    }

    const accepted: File[] = [];

    for (const f of selected) {
      if (accepted.length >= remainingSlots) break;

      if (!isPdf(f)) continue;

      if (f.size > MAX_FILE_BYTES) {
        addNotification({
          type: 'error',
          title: t('general.file_upload'),
          message: t('general.file_too_big'),
          showTimeInMs: 5000,
        });
        continue;
      }

      accepted.push(f);
    }

    if (selected.length > remainingSlots) {
      addNotification({
        type: 'error',
        title: t('general.file_upload'),
        message: t('general.max_allowed_files_5'),
        showTimeInMs: 5000,
      });
    }

    if (accepted.length > 0) {
      setAttachments(prev => [...prev, ...accepted]);
    }

    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const attachmentInfo = useMemo(
    () =>
      attachments.map(f => ({
        name: f.name,
        mb: bytesToMb(f.size, 2),
      })),
    [attachments]
  );

  const isValidRoute = !!jobId && jobId in IMAGES;

  if (!isValidRoute) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-semibold text-gray-900">
            {t('jobs.job_not_found_header')}
          </h1>
          <p className="mt-3 text-gray-600">{t('jobs.job_not_found_text')}</p>
        </div>
      </div>
    );
  }

  const headerKey = `jobs.${jobId}_header`;
  const textKey = `jobs.${jobId}_text`;

  const todos = Array.from(
    { length: TODOS_COUNT[jobId] },
    (_, i) => `jobs.${jobId}_your_todos_item_${i + 1}`
  );
  const profiles = Array.from(
    { length: PROFILES_COUNT[jobId] },
    (_, i) => `jobs.${jobId}_your_profile_item_${i + 1}`
  );
  const benefits = Array.from(
    { length: BENEFITS_COUNT[jobId] },
    (_, i) => `jobs.${jobId}_our_offer_item_${i + 1}`
  );

  return (
    <div className="relative isolate -z-10">
      <div className="isolate bg-white">
        <div className="min-h-screen">
          <div className="mx-auto relative isolate -z-10 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                <Reveal
                  as="div"
                  from="left"
                  cacheKey={`jobs-${jobId}-headline`}
                  className="lg:col-span-2 xl:col-auto"
                >
                  <p className="text-sm/6 font-bold text-accent-primary hover:text-orange-600">
                    {t('jobs.we_look_for_you')}
                  </p>
                  <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-gray-800 sm:text-7xl">
                    {t(headerKey)}
                  </h1>
                </Reveal>

                <Reveal
                  as="div"
                  from="left"
                  delay={0.12}
                  cacheKey={`jobs-${jobId}-text`}
                  className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1"
                >
                  <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    {t(textKey)}
                  </p>
                </Reveal>

                <Reveal
                  as="img"
                  from="right"
                  delay={0.18}
                  cacheKey={`jobs-${jobId}-image`}
                  src={IMAGES[jobId]}
                  alt=""
                  className="mt-10 aspect-6/5 w-full max-w-2xl rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10 sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-accent-primary/50 sm:h-32" />
          </div>

          <div className="mx-auto max-w-7xl grid mt-12 sm:mt-16 grid-cols-1 gap-16 lg:grid-cols-2 px-6 sm:px-8">
            <Reveal
              as="div"
              from="up"
              distance={0}
              cacheKey="jobs-section-todos"
            >
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-accent-primary sm:text-3xl">
                {t('jobs.your_todos')}
              </h2>
              <ul
                role="list"
                className="mt-4 list-disc pl-5 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7"
              >
                {todos.map((todo, index) => (
                  <ListReveal
                    key={todo}
                    cacheKey={`jobs-todo-${todo}`}
                    delay={index * 0.06}
                  >
                    <li className="text-gray-600">{t(todo)}</li>
                  </ListReveal>
                ))}
              </ul>
            </Reveal>

            <Reveal
              as="div"
              from="up"
              distance={0}
              delay={0.08}
              cacheKey="jobs-section-profile"
            >
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-accent-primary sm:text-3xl">
                {t('jobs.your_profile')}
              </h2>
              <ul
                role="list"
                className="mt-4 list-disc pl-5 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7"
              >
                {profiles.map((profile, index) => (
                  <ListReveal
                    key={profile}
                    cacheKey={`jobs-profile-${profile}`}
                    delay={index * 0.06}
                  >
                    <li className="text-gray-600">{t(profile)}</li>
                  </ListReveal>
                ))}
              </ul>
            </Reveal>

            <Reveal
              as="div"
              from="up"
              distance={0}
              delay={0.16}
              cacheKey="jobs-section-offer"
            >
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-accent-primary sm:text-3xl">
                {t('jobs.our_offer')}
              </h2>
              <ul
                role="list"
                className="mt-4 list-disc pl-5 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7"
              >
                {benefits.map((benefit, index) => (
                  <ListReveal
                    key={benefit}
                    cacheKey={`jobs-benefit-${benefit}`}
                    delay={index * 0.06}
                  >
                    <li className="text-gray-600">{t(benefit)}</li>
                  </ListReveal>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal
            as="div"
            from="left"
            cacheKey="jobs-apply-now"
            className="mx-auto max-w-7xl px-6 lg:px-8 mt-24"
          >
            <h2 className="text-5xl font-semibold tracking-tight text-gray-800 sm:text-6xl">
              {t('jobs.apply_now')}
            </h2>
          </Reveal>

          <Reveal
            as="form"
            from="up"
            distance={0}
            encType="multipart/form-data"
            cacheKey="contact-form"
            onSubmit={onSubmitApplication}
            method="POST"
            className="mx-auto max-w-7xl px-6 lg:px-8 mt-12 sm:mt-16 pb-24 sm:pb-32"
          >
            <div className="max-w-2xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
                      disabled={attachments.length >= 5}
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
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    {t('general.attachments')}
                  </label>
                  <p className="block text-sm/6 text-gray-900">
                    {t('general.attachments_explanation')}
                  </p>
                  <label
                    htmlFor="attachments"
                    className="flex mt-2 w-fit cursor-pointer items-center gap-2 rounded-lg border border-text/50 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    <PaperClipIcon
                      className="size-4 text-text"
                      aria-hidden="true"
                    />
                    {t('general.select_file')}
                  </label>

                  <input
                    id="attachments"
                    name="documents[]"
                    type="file"
                    multiple
                    className="hidden"
                    accept="application/pdf"
                    onChange={onAttachmentsChange}
                  />
                  {attachments.length > 0 && (
                    <div>
                      <p className="mt-6 text-sm/6 text-gray-900">
                        {t('general.uploaded_files')}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {attachmentInfo.map((f, idx) => (
                          <li
                            key={`${f.name}-${idx}`}
                            className="flex items-center gap-3 rounded-lg border border-gray-500 bg-white p-3 text-sm text-gray-800"
                          >
                            <span className="min-w-0 flex-1 truncate">
                              {f.name}
                            </span>
                            <span className="shrink-0 text-gray-400 whitespace-nowrap">
                              {f.mb} MB
                            </span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(idx)}
                              className="shrink-0 text-gray-500 hover:text-gray-900 cursor-pointer whitespace-nowrap"
                            >
                              {t('general.remove')}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                  color={'orange'}
                  type="submit"
                >
                  {isSending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CircularProgressIndicator />
                    </div>
                  )}
                  <span className={isSending ? 'invisible' : ''}>
                    {t('general.send_application')}
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
