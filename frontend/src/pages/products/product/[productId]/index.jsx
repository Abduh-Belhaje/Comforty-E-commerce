/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  Dialog,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import { Rating } from "@mui/material";
import {
  getChairDetails,
  getChairReviews,
  addReview
} from "../../../../services/productsService";
import Inconnu from "../../../../../public/Inconnu.jpg"
import { SuccessAlert, WaringAlert } from "../../../../components/ui/alert-dialog";
import { extractEmail } from "../../../../lib/utils";

const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You're allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can't do with it</h4>
    
    <ul role="list">
    <li>Don't be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don't be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [comment, setcomment] = useState("");
  const [rating, setrating] = useState(0);
  const [selectedImg,setSelectedImg] = useState()
  const [product,setProduct] = useState()
  const [reviews,setReviews] = useState()
  const [highlights,setHighlights] = useState({Color : "Gray",Height : "107 cm", Width : "58 cm",Weight : "20 Kg"})
  const [alertMsg,setAlterMsg] = useState("");
  const [showAlert,setShowAlert] = useState(false);
  const [successAlert,setShowSuccess] = useState(false);
  const openReviewModal = () => setIsReviewOpen(true);
  const closeReviewModal = () => setIsReviewOpen(false);




  const submitReview = async () => {
    const email = extractEmail();
    if(email){
      const response = await addReview({ email: email, name: product.name, rating, comment });
      if(response.success){
        setAlterMsg("Review added successfully")
        setShowSuccess(true)
        setTimeout(()=>{
          setShowSuccess(false)
          },2500)
      }else{
        setAlterMsg(response.message)
        setShowAlert(true)
        setTimeout(()=>{
          setShowAlert(false)
          },2500)
      }
    }else{
      setAlterMsg("User not authenticated !")
        setShowAlert(true)
        setTimeout(()=>{
          setShowAlert(false)
          },2500)
        
      }
      closeReviewModal()
    }
    



  useEffect(()=>{
    const path =  window.location.href.split("/")
    const name = decodeURIComponent(path[4]);
    const fetchChairDetaild = async () => {
      const response = await getChairDetails(name)
      setProduct(response)
    }

    const fetchChairReviews = async () =>{
      const response = await getChairReviews(name)
      setReviews(response)
    }
    fetchChairDetaild()
    fetchChairReviews()
    
  },[])


  useEffect(()=>{
    if(product){
      setSelectedImg(product.images[0])
      setHighlights({Color : product.color,Height : product.height, Width : product.width,Weight : product.weight})
    }
  },[product])


  return (
    <div className="bg-white border mb-24">
      { showAlert && <WaringAlert msg={alertMsg} />}
      { successAlert && <SuccessAlert msg={alertMsg} />}
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg flex justify-center">
              <img
                src={selectedImg}
                className="object-cover w-3/5 "
              />
            </div>
            <div className=" py-12 flex">
              {
                product && product.images.map((image,index) => (
                  image != selectedImg && 
                  <img 
                    key={index} 
                    src={image} 
                    onClick={()=> setSelectedImg(product.images[index])}
                    className="lg:w-32 w-28 border rounded p-5 ml-5" />
                ))
              }

            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none ">
            <div className="flex flex-col-reverse">
            <div>
                <h3 className="sr-only">Reviews</h3>
               <div className="flex py-3 items-center">
                <span className="pr-10 text-xl font-extrabold text-green-700">${product && product.price}</span>
                <div className="flex items-center">
                {product && [1, 2, 3, 4, 5].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                            product.rate >= rating
                            ? "text-yellow-400"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
               </div>
              </div>
              <div className="">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product && product.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
              </div>
            </div>

            <p className="py-1 text-gray-500">{product && product.description}</p>

            <div className="py-5 flex flex-col">
            {Object.entries(highlights).map(([key, value]) => (
              <span className="text-gray-500 py-1" key={key}>{key} : {value}</span>
            ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Watchlist
              </button>
            </div>

            <div className="mt-10 border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">License</h3>
              <p className="mt-4 text-sm text-gray-500">
                {license.summary}{" "}
                <a
                  href={license.href}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Read full license
                </a>
              </p>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
              <ul role="list" className="mt-4 flex items-center space-x-6">
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Instagram</span>
                    <svg
                      className="h-6 w-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on X</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <TabGroup>
              <div className="border-b border-gray-200 relative">
                <TabList className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }
                  >
                    Customer Reviews
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }
                  >
                    FAQ
                  </Tab>
                  <button
                    onClick={openReviewModal}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md absolute right-0"
                  >
                    Leave a Review
                  </button>
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                <TabPanel className="-mb-10">
                  <h3 className="sr-only">Customer Reviews</h3>
                  <Transition show={isReviewOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      open={isReviewOpen}
                      onClose={closeReviewModal}
                    >
                      <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                      />
                      <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6  px-16 shadow-lg">
                          <Dialog.Title className="text-lg font-semibold text-gray-900">
                            Write a Review
                          </Dialog.Title>
                          <div className="mt-4">
                            <Rating
                              name="review-rating"
                              value={rating}
                              onChange={(event, newValue) =>
                                setrating(parseInt(newValue))
                              }
                              precision={0.5}
                              size="large"
                              className="text-yellow-400"
                            />
                            <textarea
                              value={comment}
                              onChange={(e) => setcomment(e.target.value)}
                              rows="4"
                              className="mt-4 outline-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Write your review here..."
                            />
                          </div>
                          <div className="mt-4 flex gap-4">
                            <button
                              type="button"
                              onClick={submitReview}
                              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              onClick={closeReviewModal}
                              className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                              Cancel
                            </button>
                          </div>
                        </Dialog.Panel>
                      </div>
                    </Dialog>
                  </Transition>

                  {reviews && reviews.map((review, reviewIdx) => (
                    <div
                      key={review.first_name}
                      className="flex space-x-4 text-sm text-gray-500"
                    >
                      <div className="flex-none py-10">
                        <img
                          src={review.pictur_url ? review.pictur_url  : Inconnu}
                          alt=""
                          className="h-10 w-10 rounded-full bg-gray-100"
                        />
                      </div>
                      <div
                        className={classNames(
                          reviewIdx === 0 ? "" : "border-t border-gray-200",
                          "py-10"
                        )}
                      >
                        <h3 className="font-medium text-gray-900">
                          {review.first_name} {review.last_name}
                        </h3>
                        <p>
                          <time dateTime="22-08-2014">22-08-2014</time>
                        </p>

                        <div className="mt-4 flex items-center">
                          {[1,2, 3, 4,5].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rate >= rating
                                  ? "text-yellow-400"
                                  : "text-gray-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {review.rate} out of 5 stars
                        </p>

                        <div
                          className="prose prose-sm mt-4 max-w-none text-gray-500"
                          dangerouslySetInnerHTML={{ __html: review.comment }}
                        />
                      </div>
                    </div>
                  ))}
                </TabPanel>

                <TabPanel className="text-sm text-gray-500">
                  <h3 className="sr-only">Frequently Asked Questions</h3>

                  <dl>
                    {faqs.map((faq) => (
                      <Fragment key={faq.question}>
                        <dt className="mt-10 font-medium text-gray-900">
                          {faq.question}
                        </dt>
                        <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                          <p>{faq.answer}</p>
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </TabPanel>

                <TabPanel className="pt-10">
                  <h3 className="sr-only">License</h3>

                  <div
                    className="prose prose-sm max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{ __html: license.content }}
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div> 
    </div>
  );
}
