import Head from 'next/head';
import { Categories, PostCard, PostWidget } from '../components';
import { getPosts } from '../services';

const Home = ({ posts }) => {
   return (
      <section className="container mx-auto px-10 mb-8">
         <Head>
            <title>CMS Blog</title>
         </Head>
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 col-span-1">
               {posts?.map((post) => (
                  <PostCard key={post.title} {...post} />
               ))}
            </div>
            <div className="lg:col-span-4 col-span-1">
               <div className="lg:sticky relative top-8">
                  <PostWidget />
                  <Categories />
               </div>
            </div>
         </div>
      </section>
   );
};

export const getStaticProps = async () => {
   const posts = (await getPosts()) || [];

   return {
      props: {
         posts,
      },
   };
};

export default Home;
