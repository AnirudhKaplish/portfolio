import React from 'react';
import Hero from '../components/site/Hero';
import About from '../components/site/About';
import Experience from '../components/site/Experience';
import Projects from '../components/site/Projects';
import Skills from '../components/site/Skills';
import Roadmap from '../components/site/Roadmap';
import Writing from '../components/site/Writing';
import Contact from '../components/site/Contact';

const Home: React.FC = () => (
  <>
    <Hero /><About /><Experience /><Projects /><Skills /><Roadmap /><Writing /><Contact />
  </>
);
export default Home;
