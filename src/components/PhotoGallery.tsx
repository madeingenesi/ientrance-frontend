"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface Photo {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  url: string;
  formats?: {
    large?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    thumbnail?: { url: string; width: number; height: number };
  };
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  // Debug: log delle foto per verificare le URL
  console.log("Photos in gallery:", photos);

  const openModal = (photo: Photo) => {
    setSelectedImage(photo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">Photo Gallery</h3>

      {/* Main Swiper */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className="main-swiper mb-4"
          style={
            {
              "--swiper-navigation-color": "#3b82f6",
              "--swiper-pagination-color": "#3b82f6",
            } as any
          }
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative cursor-pointer group w-full h-full flex items-center justify-center"
                onClick={() => openModal(photo)}
              >
                <Image
                  src={photo.formats?.large?.url || photo.url}
                  alt={
                    photo.alternativeText || photo.name || `Photo ${index + 1}`
                  }
                  width={photo.formats?.large?.width || photo.width}
                  height={photo.formats?.large?.height || photo.height}
                  className="w-full h-96 object-cover rounded-lg block"
                  priority={index === 0}
                />
                {/* Overlay con icona zoom */}
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4 rounded-b-lg">
                    <p className="text-sm">{photo.caption}</p>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Swiper */}
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className="thumbs-swiper"
          breakpoints={{
            640: {
              slidesPerView: 6,
            },
            768: {
              slidesPerView: 8,
            },
            1024: {
              slidesPerView: 10,
            },
          }}
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <Image
                src={
                  photo.formats?.thumbnail?.url ||
                  photo.formats?.small?.url ||
                  photo.url
                }
                alt={
                  photo.alternativeText ||
                  photo.name ||
                  `Thumbnail ${index + 1}`
                }
                width={photo.formats?.thumbnail?.width || 150}
                height={photo.formats?.thumbnail?.height || 150}
                className="w-full h-16 object-cover rounded cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal per immagine ingrandita */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.alternativeText || selectedImage.name}
              width={selectedImage.width}
              height={selectedImage.height}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {selectedImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                <p className="text-center">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .main-swiper {
          height: 400px !important;
          width: 100% !important;
        }

        .main-swiper .swiper-slide {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 100% !important;
        }

        .main-swiper .swiper-button-next,
        .main-swiper .swiper-button-prev {
          background-color: rgba(255, 255, 255, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: -20px;
        }

        .main-swiper .swiper-button-next:after,
        .main-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }

        .main-swiper .swiper-pagination-bullet {
          background-color: #3b82f6;
          opacity: 0.5;
        }

        .main-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .thumbs-swiper .swiper-slide-thumb-active img {
          opacity: 1;
          border: 2px solid #3b82f6;
        }

        .thumbs-swiper {
          height: 64px !important;
        }
      `}</style>
    </div>
  );
}
