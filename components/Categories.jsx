import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCategories } from '../services';

const Categories = () => {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      getCategories().then((newCategories) => setCategories(newCategories));
   }, []);

   return (
      <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
         <h3 className="text-xl pb-4 mb-8 font-semibold border-b">
            Categories
         </h3>
         {categories?.map(({ slug, name }) => (
            <Link href={`/category/${slug}`} key={slug} passHref>
               <span className="cursor-pointer block pb-3 mb-3">{name}</span>
            </Link>
         ))}
      </section>
   );
};

export default Categories;
