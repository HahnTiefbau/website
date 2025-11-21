import './index.css';
import './i18n';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DataSafetyPage } from './data_safety/DataSafetyPage';
import { ImprintPage } from './imprint/ImprintPage';
import { RootNavigation } from './core/RootNavigation';
import { HomePage } from './home/HomePage';
import { ServicesPage } from './services/ServicesPage';
import { ReferencesPage } from './references/ReferencesPage';
import { AboutUsPage } from './about_us/AboutUsPage';
import { ContactPage } from './contact/ContactPage';
import { Job1Page } from './jobs/Job1Page';
import { Job3Page } from './jobs/Job3Page';
import { Job2Page } from './jobs/Job2Page';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootNavigation />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'references',
        element: <ReferencesPage />,
      },
      {
        path: 'about',
        element: <AboutUsPage />,
      },
      {
        path: 'impressum',
        element: <ImprintPage />,
      },
      {
        path: 'privacy',
        element: <DataSafetyPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'jobs/job1',
        element: <Job1Page />,
      },
      {
        path: 'jobs/job2',
        element: <Job2Page />,
      },
      {
        path: 'jobs/job3',
        element: <Job3Page />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    {import.meta.env.VITE_MODE === 'local' && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
  </QueryClientProvider>
);
