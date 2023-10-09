import { useEffect, useState } from "react";

import Icon from '../components/svg';
import BG from '../assets/imags/greennoise.png'

import Rating from '../components/Reviews/Rating';
import Review from '../components/Reviews';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { ReviewsFields } from "../utils/form";

import { db } from "../firebase";
import { addDoc, onSnapshot, query, limit, where, orderBy, collection, serverTimestamp } from "firebase/firestore";
import useLang from "../store/useLang";

// Styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/mousewheel';
import 'swiper/css/a11y';

export default function Reviews() {
  const { langs , lang , langSelected } = useLang();

  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [error, setError] = useState(false);

  const [rate, setRate] = useState(5);
  const [isFormActive, setIsFormActive] = useState(false);
  const [thankPage, setThankPage] = useState(false);

  // const TFields = t(`${activePage}.reviews.form.fields`, {returnObjects: true});
  // const TFieldsErrors = t(`${activePage}.reviews.form.fieldserrors`, {returnObjects: true});

  // const ReviewsFields = useMemo(() => reviewsFields.map(field => {
  //     field.placeholder = TFields[field.name.toLowerCase()] || field.placeholder;
  //     field.error = TFieldsErrors[field.name.toLowerCase()] || field.error;
  //     field.empty = t('GlobalForm.emptyField', {field: field.placeholder});
  //     return field;
  // }), [TFields, TFieldsErrors, t]);

  const storeReview = e => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value.trim() });
  }

  // submitting the review form to firebase collection called "reviews"
  const sendReview = async (e) => {
    e.preventDefault();
    try {
      // clear the error message
      setError(false);
      await addDoc(collection(db, "Reviews"), {...reviewData, rate, createdAt: serverTimestamp()});
      if (reviewData.rate >= 4) setReviews([...reviews, reviewData]);
      setThankPage(true);
    } catch (e) {
      setError(true);
      console.error(e);
    }
  }

  // clear the form data
  const reset = () => {
    setIsFormActive(false);
    setReviewData({});
    setRate(5);
  }

  // loading reviews from firebase collection called "reviews"
  useEffect(() => {
    (async () => {
      try {
        // get the reviews with rate >= 4 limit of 100 review
        onSnapshot(query(collection(db, "Reviews"), where("rate", ">=", 4), orderBy("rate", "desc"), limit(100)), (querySnapshot) => {
          setReviews(querySnapshot.docs.map(doc => doc.data()));
        });
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);

  // set a timeout to close the form after 15 seconds
  useEffect(() => {
    if (!thankPage) return;
    const timeout = setTimeout(() => {
      setIsFormActive(false);
    }, 15000);
    return () => clearTimeout(timeout);
  }, [isFormActive, thankPage]);

  // effect to clear custom error messages
  useEffect(() => {
    if(!error) return
    const timeout = setTimeout(() => {
      setError(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  
  return (
    <section id="reviews" className="w-screen min-h-[400px] relative py-10 flex flex-1 justify-center items-center flex-col gap-10 shadow-inner overflow-hidden " style={{backgroundImage: `url(${BG})`}}>
      <div className='w-full flex justify-center items-center flex-col gap-4'>
        <div className={`h-14 w-24 flex items-center justify-between bg-[#ffb4b6]] transition-all select-none z-20`}>
          <Icon
            label="Lotus"
            src="https://cdn.lordicon.com/rvrbsoyg.json"
            colors={{sc: "#404e36", pc: "#CFCFB5"}}
            height={140}
            width={140}
          />
        </div>
        <h2 className={`sm:text-4xl text-center text-bleach-light text-4xl uppercase font-bold`}>What People Says About Cactusia</h2>
      </div>
    {isFormActive ? 
    <section className='w-full flex flex-1 justify-center items-center px-4 flex-col'>
    {thankPage ?        
        <article className="w-full flex flex-1 justify-center items-center flex-col gap-4">
          <h1 className="sm:text-4xl text-3x text-center text-yoga-white font-bold uppercase">Thank You '{reviewData.fullname}' For Your Review</h1>
          <button onClick={() => setIsFormActive(false)} className="cinzel font-bold yoga-btn">Go Back</button>
        </article>
    :
        // <Form
        // animatedIcon
        // title={"Add Your Review"}
        // onSubmit={sendReview}
        // state={[reviewData, setReviewData]}
        // fields={ReviewsFields}
        // submitBtn={t('contact.form.submitBtn')}
        // resetBtn={t(`${activePage}.reviews.form.resetBtn`)}
        // EmptyErrorMessage={t('GlobalForm.emptyFields')}
        // ErrorMessage={t('GlobalError.text')}
        // errorTrigger={error}
        // onReset={() => {setIsFormActive(false); setRate(5)}}
        // insertElement={<Rating  className='h-8 w-8 cursor-pointer' rate={rate} setRate={setRate}/>}
        // />

      <form onSubmit={sendReview} action="" className="flex flex-col gap-4">
        <Rating  className='h-8 w-8 cursor-pointer' rate={rate} setRate={setRate}/>
        { ReviewsFields.map((field,i)=>(
          <fieldset key={i} className='md:w-[400px] w-full flex items-start justify-center gap-1 flex-col'>
            {
              field.type === "textarea" ?
              <textarea
              onChange={storeReview}
              className={`shadow-lg p-4 rounded-lg w-full font-semibold text-base border-2 border-[#a0a08e] text-[#728b67] outline-2 outline-[#728b67] resize-y`}
              name={field.name}
              placeholder={field.translateLabels[langSelected]}
              // the textarea expand when the user type new lines
              rows={reviewData[field.name]?.split("\n").length}
              ></textarea>
              :
              <input
              onChange={storeReview}
              className={`shadow-lg p-4 rounded-lg w-full font-semibold text-base border-2 border-[#a0a08e] text-[#728b67] outline-2 outline-[#728b67] `}
              type={field.type}
              name={field.name} 
              placeholder={field.translateLabels[langSelected]}
              />
            }
          </fieldset>
        ))}
        <div className="flex justify-center items-center gap-4">
          <button type="reset" onClick={reset} className="shadow-xl rounded-lg w-1/2 hover:bg-bleach-fade hover:text-green-dark duration-200 active:scale-90 px-6 py-3 flex justify-center items-center text-bleach border-2 border-[#CFCFB5] font-semibold text-lg uppercase tracking-wider outline-[#728b67] disabled:active:scale-100 disabled:bg-gray-600 disabled:cursor-not-allowed">Cancel</button>
          <button type="submit" className="shadow-xl rounded-lg w-1/2 hover:bg-bleach-fade duration-200 active:scale-90 px-6 py-3 bg-bleach flex justify-center items-center text-green-dark font-semibold text-lg uppercase tracking-wider outline-[#728b67] disabled:active:scale-100 disabled:bg-gray-600 disabled:cursor-not-allowed">Send</button>
        </div>
      </form>
          
    }
    </section> :
    <section className='w-full flex flex-1 justify-center items-center flex-col gap-12'>
      <Swiper
        className="w-full h-full"
        modules={[Autoplay, A11y]}
        loop
        grabCursor
        centeredSlides
        content="center"
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        a11y={{
          enabled: true, // enable A11y in other words Accessibility
        }}
        wrapperTag='ul'
      >
      {
        reviews.map((review, index) => {
          return (
            <SwiperSlide key={index} tag='li'>
              <Review {...review}/>
            </SwiperSlide>
          )
        })
      }
      </Swiper>
    </section>
    }
    {!isFormActive && <button onClick={() => setIsFormActive(true)} className="shadow-xl rounded-lg md:w-[250px] w-full hover:bg-bleach-fade duration-200 active:scale-90 px-6 py-3 bg-bleach flex justify-center items-center text-green-dark font-semibold text-lg uppercase tracking-wider outline-[#728b67] disabled:active:scale-100 disabled:bg-gray-600 disabled:cursor-not-allowed">Add Your Review</button> }
    </section>
  )
}
