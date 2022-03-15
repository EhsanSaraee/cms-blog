import { useRouter } from 'next/router';
import {
   Author,
   CommentForm,
   Comments,
   Loader,
   PostDetail,
} from '../../components';
import Categories from '../../components/Categories';
import PostWidget from '../../components/PostWidget';
import { getPostDetails, getPosts } from '../../services';

const PostDetails = ({ post }) => {
   const router = useRouter();

   if (router.isFallback) {
      return <Loader />;
   }

   return (
      <section className="container mx-auto px-10 mb-8">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
               <PostDetail post={post} />
               <Author author={post.author} />
               <CommentForm slug={post.slug} />
               <Comments slug={post.slug} />
            </div>
            <div className="col-span-1 lg:col-span-4">
               <div className="relative lg:sticky top-8">
                  <PostWidget
                     slug={post.slug}
                     categories={post.categories?.map(
                        (category) => category.slug
                     )}
                  />
                  <Categories />
               </div>
            </div>
         </div>
      </section>
   );
};

export default PostDetails;

export const getStaticProps = async ({ params: { slug } }) => {
   const data = await getPostDetails(slug);

   return {
      props: { post: data },
   };
};

export const getStaticPaths = async () => {
   const posts = await getPosts();

   return {
      paths: posts?.map(({ node: { slug } }) => ({ params: { slug } })),
      fallback: true,
   };
};
