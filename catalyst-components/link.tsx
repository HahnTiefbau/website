/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from '@headlessui/react'
import {
    Link as RouterLink,
    type LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { forwardRef } from 'react'

export const Link = forwardRef<
    HTMLAnchorElement,
    { href: string } & Omit<RouterLinkProps, 'to'>
>(function Link({ href, ...rest }, ref) {
    return (
        <Headless.DataInteractive>
            <RouterLink to={href} ref={ref} {...rest} />
        </Headless.DataInteractive>
    )
})
