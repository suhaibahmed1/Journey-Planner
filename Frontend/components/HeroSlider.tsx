'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

const slides = [
  { id: 1, src: '/Makkah.jpg', alt: 'Holy Kaaba, Makkah - Saudi Arabia' },
  { id: 2, src: '/Madina.jpg', alt: 'Masjid an-Nabawi, Madina - Saudi Arabia' },
  { id: 3, src: '/k.jpg', alt: 'Kumrat Valley - Pakistan' },
  { id: 4, src: '/Italyrome.jpg', alt: 'Colosseum, Rome - Italy' },
  { id: 5, src: '/Malay.jpg', alt: 'Petronas Towers - Kuala Lumpur, Malaysia' },
  { id: 6, src: '/EifTower.jpg', alt: 'Eiffel Tower - Paris, France' },
  { id: 7, src: '/arora.jpg', alt: 'Northern Lights - Aurora Borealis' },
]


export default function HeroSlider() {
  return (
    <div className="relative w-full h-[90vh]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-4xl font-bold">
                Your Journey Starts Here
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
