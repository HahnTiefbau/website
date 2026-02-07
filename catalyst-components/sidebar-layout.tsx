'use client'

import * as Headless from '@headlessui/react'
import { useState } from 'react'
import { NavbarItem } from './navbar'
import {Bars2Icon} from "@heroicons/react/20/solid";
import {Divider} from "./divider";

function CloseMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  )
}

function MobileSidebar({ open, close, children }: React.PropsWithChildren<{ open: boolean; close: () => void }>) {
  return (
    <Headless.Dialog open={open} onClose={close} className="lg:hidden">
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <Headless.DialogPanel
        transition
        className="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full"
      >
        <div className="flex h-full flex-col rounded-lg shadow-xs ring-1 ring-ring-surface bg-secondary-mobile">
          <div className="-mb-3 px-4 pt-3">
            <Headless.CloseButton as={NavbarItem} aria-label="Close navigation">
              <CloseMenuIcon />
            </Headless.CloseButton>
          </div>
          {children}
        </div>
      </Headless.DialogPanel>
    </Headless.Dialog>
  )
}

export function SidebarLayout({
  navbarMobile,
    navbarDesktop,
  sidebar,
  children,
}: React.PropsWithChildren<{ navbarMobile: React.ReactNode; navbarDesktop: React.ReactNode; sidebar: React.ReactNode }>) {
  let [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="relative isolate h-dvh flex min-h-dvh w-screen max-w-screen bg-primary-mobile max-lg:flex-col lg:bg-primary">
      {/* Sidebar on desktop */}
        <div
            className={`
          fixed inset-y-0 left-0 max-lg:hidden
          w-75
          transition-transform
          duration-300 ease-in-out
        `}
        >
            {sidebar}
        </div>

      {/* Sidebar on mobile */}
      <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
        {sidebar}
      </MobileSidebar>

      {/* Navbar on mobile */}
        <header className="top-0 z-30 flex flex-col lg:hidden">
            <div className="px-3 flex items-center justify-between py-1 sm:py-2.5 w-full">
                <NavbarItem onClick={() => setShowSidebar(true)} aria-label="Open navigation">
                    <Bars2Icon />
                </NavbarItem>
                <div className="min-w-0 flex-1">
                    {navbarMobile}
                </div>
            </div>
            <Divider className="w-full" />
        </header>

      {/* Content */}
      <main
            className={`
          flex flex-1 min-h-0 flex-col lg:pb-2 lg:min-w-0 lg:pt-2 lg:pr-2
          transition-[padding-left] duration-300 ease-in-out
        `}
        >
          <div
              className="
                  flex flex-col flex-1 h-full overflow-hidden min-h-0
                  lg:rounded-lg lg:bg-secondary lg:shadow-xs lg:ring-1 lg:ring-ring-surface
                "
          >
              {/* Navbar on desktop */}
              <header className="max-lg:hidden h-20 z-40">
                  <div className="min-w-0 flex-1">{navbarDesktop}</div>
              </header>

              <div className="flex-1 overflow-auto min-h-0 mx-auto w-full">
                  {children}
              </div>
          </div>
      </main>
    </div>
  )
}
