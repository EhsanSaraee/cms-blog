import { useState, useEffect } from 'react';
import { getCategories } from '../services';
import Link from 'next/link';

const Header = () => {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      getCategories().then((newCategories) => setCategories(newCategories));
   }, []);

   return (
      <section className="container mx-auto px-10 mb-8">
         <div className="border-b w-full inline-block border-blue-400 py-8">
            <div className="md:float-left block">
               <Link href="/" passHref>
                  <span className="font-bold cursor-pointer text-4xl text-white">
                     GraphCMS
                  </span>
               </Link>
            </div>
            <div className="hidden md:float-left md:contents">
               {categories?.map(({ name, slug }) => (
                  <Link href={`/category/${slug}`} key={name} passHref>
                     <span className="md:float-right mt-2 align-middle ml-4 text-white font-semibold cursor-pointer">
                        {name}
                     </span>
                  </Link>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Header;
