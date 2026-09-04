
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Categories from '../components/sections/categories';
import Contact from '../components/sections/contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030014]">

      <Hero />
      <About />
      <Categories />
      
      <Contact />
    </div>
  );
}