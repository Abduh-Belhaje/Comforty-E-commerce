import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Armchair, Coffee, Home, Heart } from "lucide-react";

// Sample carousel items for the chair store
const carouselItems = [
  {
    id: 1,
    title: "Find Your Perfect Seat",
    description:
      "Discover chairs that feel like a warm hug, perfect for your home office",
    imageUrl:
      "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "Explore Comfy Chairs",
    ctaLink: "/office-chairs",
    icon: Armchair,
  },
  {
    id: 2,
    title: "Relax in Style",
    description: "Sink into our plush armchairs and let your worries melt away",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Plush+Armchairs",
    ctaText: "Find Your Relaxation Spot",
    ctaLink: "/armchairs",
    icon: Coffee,
  },
  {
    id: 3,
    title: "Gather 'Round",
    description:
      "Create lasting memories with dining chairs that bring family closer",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Family+Dining+Chairs",
    ctaText: "Set the Table",
    ctaLink: "/dining-chairs",
    icon: Home,
  },
  {
    id: 4,
    title: "Spread the Comfort",
    description: "Share the love: Buy one chair, get 25% off the second",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Share+the+Love",
    ctaText: "Double the Coziness",
    ctaLink: "/special-offer",
    icon: Heart,
  },
];

export default function SliderSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide effect for the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 py-8 px-4 rounded-lg shadow-inner">
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={item.id}>
              <Card className="border-none bg-transparent">
                <CardContent className="p-0 relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-800 to-blue-700/80 flex flex-col justify-center items-start text-white p-6 sm:p-12">
                    <div className="flex items-center mb-4">
                      <item.icon className="w-8 h-8 mr-3 text-white" />
                      <h2 className="text-2xl sm:text-4xl font-bold">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-lg sm:text-xl mb-6 max-w-md">
                      {item.description}
                    </p>
                    <Button
                      variant="outline"
                      className="text-cyan-600 border-white hover:bg-white hover:text-cyan-800 transition-colors"
                      href={item.ctaLink}
                    >
                      {item.ctaText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 text-white" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 text-white" />
      </Carousel>
    </div>
  );
}
