import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Link } from '../../../catalyst-components/link';
import { Text } from '../../../catalyst-components/text';
import { Outlet } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { SidebarItem } from '../../../catalyst-components/sidebar';
import { Button } from '../../../catalyst-components/button';
import { NavbarItem } from '../../../catalyst-components/navbar';
import logo from '../../assets/logo_hahn.svg';

const navigation = [
  { name: 'general.home', href: '/' },
  { name: 'general.services', href: '/services' },
  { name: 'general.references', href: '/references' },
  { name: 'general.about_us', href: '/about' },
  { name: 'general.job_offers', href: '/jobs' },
];

export function NavigationLayout() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="bg-background-white-gray">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between h-full p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-5 p-1.5">
              <img alt="" src={logo} className="h-12 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <NavbarItem onClick={() => setMobileMenuOpen(true)}>
              <span className="flex-none h-6 w-6">
                <Bars3Icon
                  aria-hidden="true"
                  className="size-6 cursor-pointer"
                />
              </span>
            </NavbarItem>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map(item => (
              <Link key={item.name} href={item.href}>
                <Text className="text-sm/6 font-semibold text-text-secondary hover:text-text">
                  {t(item.name)}
                </Text>
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            <Button color={'orange'}>{t('general.contact')}</Button>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <Link href={'/'} className="-m-3 p-1.5">
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
                  <SidebarItem>
                    <Text>{t('general.contact')}</Text>
                  </SidebarItem>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <main className="isolate ">
        <Outlet />
      </main>
    </div>
  );
}
