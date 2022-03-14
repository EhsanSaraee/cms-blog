import { useState, useEffect, useRef } from 'react';

const CommentForm = () => {
   const [error, setError] = useState(false);
   const [localStorage, setLocalStorage] = useState(null);
   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

   const commentElement = useRef();
   const nameElement = useRef();
   const emailElement = useRef();
   const storeDataElement = useRef();

   const handleCommentSubmission = () => {
      setError(false);

      const { value: comment } = commentElement.current;
      const { value: name } = nameElement.current;
      const { value: email } = emailElement.current;
      const { checked: storeData } = storeDataElement.current;

      if (!comment || !name || !email) {
         setError(true);
         return;
      }

      const commentObj = { comment, name, email, slug };

      if (storeData) {
         localStorage.setItem('name', name);
         localStorage.setItem('email', email);
      } else {
         localStorage.removeItem('name', name);
         localStorage.removeItem('email', email);
      }
   };

   return (
      <section className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
         <h3 className="text-xl mb-8 pb-4 font-semibold border-b">
            Comment Form
         </h3>
         <div className="grid grid-cols-1 gap-4 mb-4">
            <textarea
               ref={commentElement}
               className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
               placeholder="Comment"
               name="comment"
            />
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <input
               type="text"
               ref={nameElement}
               className="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
               placeholder="Name"
               name="name"
            />
            <input
               type="email"
               ref={emailElement}
               className="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
               placeholder="Email"
               name="email"
            />
         </div>
         <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
               <input
                  type="checkbox"
                  ref={storeDataElement}
                  id="storeData"
                  value="true"
                  name="storeData"
               />
               <label
                  htmlFor="storeData"
                  className="text-gray-500 cursor-pointer ml-1"
               >
                  Save my name and email for the next time I comment.
               </label>
            </div>
         </div>
         {error && (
            <p className="text-xs text-red-500">All fields are required.</p>
         )}
         <div className="mt-8">
            <button
               type="button"
               onClick={handleCommentSubmission}
               className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
            >
               Post Comment
            </button>
            {showSuccessMessage && (
               <span className="text-xl float-right font-semibold mt-3 text-green-500">
                  Comment submitted for review
               </span>
            )}
         </div>
      </section>
   );
};

export default CommentForm;
