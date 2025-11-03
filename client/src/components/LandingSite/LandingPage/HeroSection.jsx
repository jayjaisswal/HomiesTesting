import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HeroSection() {
  const slides = [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1717014211334-8ae3b98a5965?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1716767947902-9852aa9ec04d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1716767947902-9852aa9ec04d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Swiper Slider - Smaller Height with Responsive Adjustment */}
      <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] mt-[3.4rem]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper w-full h-full"
        >
          {slides.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Below Slider */}
      <div className="bg-white text-black p-10">
        <div className="text-center">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
            Hosteller<span className="text-[#4f46e5]">Homies</span>
          </h1>

          <p className="py-2 text-lg sm:text-xl md:text-2xl">
            One Solution For All Of The Hostel&apos;s Needs
          </p>
          {/* <div className="">
            <Link
              to="/auth/login"
              className="bg-[#4f46e5] text-white py-3 px-12 sm:px-16 md:px-20 hover:bg-blue-700 transition rounded text-lg sm:text-xl md:text-2xl"
            >
              Login
            </Link>
            <p className="mt-6 mb-3">OR</p>
            <Link
              to="/auth/request"
              className="text-lg sm:text-xl md:text-2xl hover:underline hover:text-blue-500"
            >
              Request Registration
            </Link>
          </div> */}
         
          <div className="text-lg sm:text-xl md:text-2xl flex flex-col items-start mx-auto w-fit py-3 max-w-[90vw] break-words">
            <span>AdminEmail: raushan@gmail.com</span>
            <span>AdminPassword: 123456789</span>
            <hr className="w-full my-2" />
            <span>UserEmail: utkarsh@gmail.com</span>
            <span>UserPassword: 123456789</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export { HeroSection };
