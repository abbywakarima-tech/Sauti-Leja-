import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'app.title': 'SautiLeja',
      'app.subtitle': 'AI-Powered Financial Management',
      'nav.dashboard': 'Dashboard',
      'nav.transactions': 'Transactions',
      'nav.inventory': 'Inventory',
      'nav.reports': 'Reports',
      'nav.insights': 'Insights',
      'nav.profile': 'Profile',
      'nav.logout': 'Logout',
      'home.hero': 'Empower Your Business with Voice',
    },
  },
  sw: {
    translation: {
      'app.title': 'SautiLeja',
      'app.subtitle': 'Huduma ya Usimamizi wa Fedha ya Artificial Intelligence',
      'nav.dashboard': 'Dashibodi',
      'nav.transactions': 'Miamala',
      'nav.inventory': 'Hazina',
      'nav.reports': 'Ripoti',
      'nav.insights': 'Mwelekeo',
      'nav.profile': 'Wasifu',
      'nav.logout': 'Toka',
      'home.hero': 'Mamanisha Biashara Yako na Sauti',
    },
  },
  sheng: {
    translation: {
      'app.title': 'SautiLeja',
      'app.subtitle': 'Smart Money Management System',
      'nav.dashboard': 'Main Page',
      'nav.transactions': 'Sales',
      'nav.inventory': 'Stock',
      'nav.reports': 'Reports',
      'nav.insights': 'Tips',
      'nav.profile': 'Account',
      'nav.logout': 'Exit',
      'home.hero': 'Run Your Business Better',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
