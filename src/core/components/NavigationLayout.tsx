import { useTranslation } from 'react-i18next';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Link } from '../../../catalyst-components/link';
import { Text } from '../../../catalyst-components/text';
import { Outlet, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { SidebarItem } from '../../../catalyst-components/sidebar';
import { Button } from '../../../catalyst-components/button';
import { NavbarItem } from '../../../catalyst-components/navbar';
import logo from '../../assets/logo_hahn.svg';
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '../../../catalyst-components/dropdown';
import Cookies from 'js-cookie';
import { useNotifications } from '../util/state/notification/useNotification';
import { CustomNotification } from './CustomNotification';

const navigation = [
  { name: 'general.home', href: '/' },
  { name: 'general.services', href: '/services' },
  { name: 'general.references', href: '/references' },
  { name: 'general.about_us', href: '/about' },
];

function classNames(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(' ');
}

export function NavigationLayout() {
  const { notifications, removeNotification } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { t, i18n } = useTranslation();

  const headerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!headerRef.current) return;

    const el = headerRef.current;

    const apply = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };

    apply();

    const ro = new ResizeObserver(() => apply());
    ro.observe(el);

    window.addEventListener('resize', apply);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  useEffect(() => {
    const cookieLang = Cookies.get('site_language');
    if (cookieLang && cookieLang !== i18n.language) {
      i18n.changeLanguage(cookieLang);
    }
  }, [i18n]);

  function handleLanguageChange(lang: 'de' | 'en') {
    Cookies.set('site_language', lang, { expires: 365, sameSite: 'Lax' });
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const currentLangShort =
    i18n.language === 'de'
      ? 'DE'
      : i18n.language === 'en'
        ? 'EN'
        : i18n.language?.toUpperCase();

  const toggleMobileMenu = () => setMobileMenuOpen(v => !v);

  return (
    <div className="bg-background-white-gray">
      <header
        ref={headerRef}
        className="sticky top-0 z-[80] bg-background-white/85 backdrop-blur border-b border-text-900/10"
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between h-full p-6 lg:px-6"
        >
          <div className="flex flex-row gap-20 items-center justify-between">
            <div className="flex lg:flex-1">
              <Link href="/" className="-mx-5 px-3 -mb-5 -mt-5.5">
                <img alt="" src={logo} className="h-12 w-auto" />
              </Link>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map(item => {
                const isCurrent =
                  location.pathname === item.href ||
                  (item.href !== '/' &&
                    location.pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={classNames(
                      isCurrent
                        ? 'text-text-900 after:opacity-100'
                        : 'text-text-700 hover:text-text-900 after:opacity-0 hover:after:opacity-50',
                      'relative px-1 py-1 text-sm font-medium transition-all duration-300',

                      'after:absolute after:left-0 after:bottom-0',
                      'after:h-[2px] after:w-full after:rounded-full after:bg-accent-primary',
                      'after:transition-all after:duration-300'
                    )}
                  >
                    {t(item.name)}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex lg:hidden">
            <NavbarItem
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
            >
              <span className="relative block h-6 w-6">
                <Bars3Icon
                  aria-hidden="true"
                  className={[
                    'absolute inset-0 h-6 w-6',
                    'transition-all duration-200 ease-out',
                    'motion-reduce:transition-none',
                    mobileMenuOpen
                      ? 'opacity-0 rotate-90 scale-75'
                      : 'opacity-100 rotate-0 scale-100',
                  ].join(' ')}
                />

                <XMarkIcon
                  aria-hidden="true"
                  className={[
                    'absolute inset-0 h-6 w-6',
                    'transition-all duration-200 ease-out',
                    'motion-reduce:transition-none',
                    mobileMenuOpen
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-75',
                  ].join(' ')}
                />
              </span>
            </NavbarItem>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            <div className="relative z-[60]">
              <Dropdown>
                <DropdownButton outline>{currentLangShort}</DropdownButton>
                <DropdownMenu className="z-[90]">
                  <DropdownItem
                    className="cursor-pointer"
                    onClick={() => handleLanguageChange('de')}
                  >
                    Deutsch
                  </DropdownItem>
                  <DropdownItem
                    className="cursor-pointer"
                    onClick={() => handleLanguageChange('en')}
                  >
                    Englisch
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Button href={'/contact'} color={'orange'}>
              {t('general.contact')}
            </Button>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <DialogBackdrop
            transition
            className="
              fixed inset-x-0 bottom-0 top-[var(--header-h)]
              z-[60] bg-black/30
              transition-opacity duration-300 ease-out
              data-[closed]:opacity-0
            "
          />
          <DialogPanel
            transition
            className="
              fixed right-0 bottom-0 top-[var(--header-h)]
              z-[70] w-full overflow-y-auto bg-white p-4
              h-[calc(100dvh-var(--header-h))]
              sm:max-w-sm sm:ring-1 sm:ring-gray-900/10
              transform transition duration-300 ease-out will-change-transform
              data-[closed]:translate-x-full data-[closed]:opacity-0
              data-[leave]:duration-200 data-[leave]:ease-in
            "
          >
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map(item => {
                    const isCurrent =
                      location.pathname === item.href ||
                      (item.href !== '/' &&
                        location.pathname.startsWith(item.href));
                    return (
                      <SidebarItem
                        key={item.name}
                        href={item.href}
                        current={isCurrent}
                      >
                        <Text>{t(item.name)}</Text>
                      </SidebarItem>
                    );
                  })}
                </div>
                <div className="py-6">
                  <SidebarItem
                    key={'general.contact'}
                    href={'/contact'}
                    current={
                      location.pathname === '/contact' ||
                      location.pathname.startsWith('/contact')
                    }
                  >
                    <Text>{t('general.contact')}</Text>
                  </SidebarItem>
                  <Dropdown>
                    <>
                      <DropdownButton as={SidebarItem} className="w-full">
                        <div className="flex w-full items-center justify-between">
                          <Text>{t('general.language')}</Text>
                          <span className="text-sm opacity-70">
                            {i18n.language === 'de'
                              ? 'DE'
                              : i18n.language === 'en'
                                ? 'EN'
                                : i18n.language?.toUpperCase()}
                          </span>
                        </div>
                      </DropdownButton>

                      <DropdownMenu anchor="bottom start" className="z-[70]">
                        <DropdownItem
                          className="cursor-pointer"
                          onClick={() => {
                            i18n.changeLanguage('de');
                          }}
                        >
                          Deutsch
                        </DropdownItem>
                        <DropdownItem
                          className="cursor-pointer"
                          onClick={() => {
                            i18n.changeLanguage('en');
                          }}
                        >
                          Englisch
                        </DropdownItem>
                      </DropdownMenu>
                    </>
                  </Dropdown>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <main className="isolate ">
        <Outlet />
        {notifications.map(({ id, type, title, message, showTimeInMs }) => (
          <CustomNotification
            type={type}
            header={title}
            description={message}
            showTimeInMs={showTimeInMs ?? 3000}
            onClose={() => removeNotification(id)}
          />
        ))}{' '}
      </main>
    </div>
  );
}
