import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
   const [relatedPosts, setRelatedPost] = useState([]);

   useEffect(() => {
      if (slug) {
         getSimilarPosts(categories, slug).then((result) =>
            setRelatedPost(result)
         );
      } else {
         getRecentPosts().then((result) => setRelatedPost(result));
      }
   }, [slug]);

   return (
      <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
         <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {slug ? 'Related Posts' : 'Recent Posts'}
         </h3>
         {relatedPosts?.map(({ slug, title, featuredImage, createdAt }) => (
            <div className="flex items-center w-full mb-4" key={title}>
               <div className="w-16 flex-none">
                  <Image
                     src={featuredImage.url}
                     alt={title}
                     className="align-middle rounded-full"
                     width={60}
                     height={60}
                  />
               </div>
               <div className="flex-grow ml-4">
                  <p className="text-gray-500 text-xs">
                     {moment(createdAt).format('MMM DD, YYYY')}
                  </p>
                  <Link href={`/post/${slug}`} className="text-base">
                     {title}
                  </Link>
               </div>
            </div>
         ))}
      </section>
   );
};

export default PostWidget;
