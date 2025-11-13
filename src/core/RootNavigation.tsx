import { ScrollRestoration } from 'react-router-dom';
import { Footer } from './components/Footer';
import { NavigationLayout } from './components/NavigationLayout';

export function RootNavigation() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationLayout />
      <Footer />
      <ScrollRestoration
        getKey={location => location.pathname + location.search}
      />
    </div>
  );
}
