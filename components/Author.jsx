import Image from 'next/image';

const Author = ({ author }) => {
   const { name, photo, bio } = author;

   return (
      <section className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
         <div className="absolute left-0 right-0 -top-14">
            <Image
               src={photo.url}
               alt={name}
               width={100}
               height={100}
               className="align-middle rounded-full"
               objectFit="cover"
            />
         </div>
         <h3 className="text-white my-4 text-xl font-bold">{name}</h3>
         <p className="text-white text-lg">{bio}</p>
      </section>
   );
};

export default Author;
