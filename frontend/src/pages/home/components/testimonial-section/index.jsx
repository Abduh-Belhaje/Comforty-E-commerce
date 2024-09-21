"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Emma Thompson",
    role: "Interior Designer",
    content:
      "The chairs from this store have transformed my clients' spaces. The quality and design are unmatched!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Office Manager",
    content:
      "We furnished our entire office with chairs from here. Our team's productivity and comfort have significantly improved.",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Homeowner",
    content:
      "I never knew sitting could be this comfortable! These chairs have become the centerpiece of my living room.",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-xl p-8"
            >
              <Quote className="text-indigo-400 w-12 h-12 mb-4" />
              <p className="text-xl text-gray-700 mb-6">
                {testimonials[currentIndex].content}
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-base text-gray-500">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4">
            <button
              onClick={handlePrev}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4">
            <button
              onClick={handleNext}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
