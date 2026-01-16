import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Link } from '../../../catalyst-components/link';
import { Text } from '../../../catalyst-components/text';
import { Outlet, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
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

  const currentLangShort =
    i18n.language === 'de'
      ? 'DE'
      : i18n.language === 'en'
        ? 'EN'
        : i18n.language?.toUpperCase();
  return (
    <div className="bg-background-white-gray">
      <header className="sticky top-0 z-50 bg-background-white/85 backdrop-blur border-b border-text-900/10">
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
            <NavbarItem onClick={() => setMobileMenuOpen(true)}>
              <span className="flex-none">
                <Bars3Icon
                  aria-hidden="true"
                  className="size-5 cursor-pointer"
                />
              </span>
            </NavbarItem>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            <div className="relative z-[60]">
              <Dropdown>
                <DropdownButton outline>{currentLangShort}</DropdownButton>
                <DropdownMenu className="z-[70]">
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
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href={'/'} className="pt-0.25">
                <img alt="" src={logo} className="h-12 w-auto" />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto not-dark:hidden"
                />
              </Link>
              <NavbarItem onClick={() => setMobileMenuOpen(false)}>
                <span className="flex-none h-6 w-6">
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </span>
              </NavbarItem>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map(item => (
                    <SidebarItem key={item.name} href={item.href}>
                      <Text>{t(item.name)}</Text>
                    </SidebarItem>
                  ))}
                </div>
                <div className="py-6">
                  <SidebarItem key={'general.contact'} href={'/contact'}>
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
        ))}
      </main>
    </div>
  );
}
