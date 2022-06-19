import { Route } from "react-router-dom";
import Home from '../pages/Home';
import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import Legalities from '../pages/Legalities';
import Services from '../pages/Services';
import Domains from '../pages/Domains';
import Domain from '../pages/Domain';
import DomainCheck from '../pages/DomainCheck';
import NotFound from '../pages/NotFound';

export const routesItems = [
  <Route path="/" element={<Home />} />,
  <Route path="/sobre-nosotros" element={<About />} />,
  <Route path="/about-us" element={<About />} />,
  <Route path="/servicios" element={<Services />} />,
  <Route path="/services" element={<Services />} />,
  <Route path="/contactar" element={<ContactUs />} />,
  <Route path="/contact" element={<ContactUs />} />,
  <Route path="/legalities" element={<Legalities />} />,
  <Route path="/legalidades" element={<Legalities />} />,
  <Route path="/legalities/:alias" element={<Legalities />} />,
  <Route path="/legalidades/:alias" element={<Legalities />} />,
  <Route path="/dominios" element={<Domains />} />,
  <Route path="/domains" element={<Domains />} />,
  <Route path="/dominios/:extension" element={<Domain />} />,
  <Route path="/domains/:extension" element={<Domain />} />,
  <Route path="/domaincheck" element={<DomainCheck />} />,
  <Route path="*" element={<NotFound />} />,

]

export const routes2 = [
    {
      component: async () => {
        const module = await import('../pages/Home');
        return module.Home;
      },
      path: '/',
    },
    {
      component: async () => {
        const module = await import('../pages/About');
        return module.About;
      },
      path: '/sobre-nosotros',
    },
    {
      component: async () => {
        const module = await import('../pages/About');
        return module.About;
      },
      path: '/about-us',
    },
    {
      component: async () => {
        const module = await import('../pages/Services');
        return module.Services;
      },
      path: '/services',
    },
    {
      component: async () => {
        const module = await import('../pages/Services');
        return module.Services;
      },
      path: '/servicios',
    },
    {
      component: async () => {
        const module = await import('../pages/ContactUs');
        return module.ContactUs;
      },
      path: '/contactar',
    },
    {
      component: async () => {
        const module = await import('../pages/ContactUs');
        return module.ContactUs;
      },
      path: '/contact',
    },
    {
      component: async () => {
        const module = await import('../pages/Legalities');
        return module.Legalities;
      },
      path: '/legalities',
    },
    {
      component: async () => {
        const module = await import('../pages/Legalities');
        return module.Legalities;
      },
      path: '/legalidades',
    },
    {
      component: async () => {
        const module = await import('../pages/Legalities');
        return module.Legalities;
      },
      path: '/legalidades/:alias',
    },
    {
      component: async () => {
        const module = await import('../pages/Legalities');
        return module.Legalities;
      },
      path: '/legalities/:alias',
    },
    {
      component: async () => {
        const module = await import('../pages/Domains');
        return module.Domains;
      },
      path: '/dominios',
    },
    {
      component: async () => {
        const module = await import('../pages/Domains');
        return module.Domains;
      },
      path: '/domains',
    },
    {
      component: async () => {
        const module = await import('../pages/Domain');
        return module.Domain;
      },
      path: '/dominios/:extension',
    },
    {
      component: async () => {
        const module = await import('../pages/Domain');
        return module.Domain;
      },
      path: '/dominios/:extension',
    },
    {
      component: async () => {
        const module = await import('../pages/DomainCheck');
        return module.DomainCheck;
      },
      path: '/domaincheck',
    },
    {
      component: async () => {
        const module = await import('../pages/NotFound');  
        return module.NotFound;
      },
      path: '*',
    },
  ];
  