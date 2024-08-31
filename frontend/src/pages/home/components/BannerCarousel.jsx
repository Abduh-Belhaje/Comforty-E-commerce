import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import banner1 from "../../../assets/BG.png";
import banner2 from "../../../assets/BG.png";
import banner3 from "../../../assets/BG.png";

const images = [{ source: banner1 }, { source: banner2 }, { source: banner3 }];

function BannerCarousel() {
  const autoPlayPlugin = useRef(
    Autoplay({
      delay: 2000, //2 second delay between slides
      stopOnInteraction: true, // stop on user interaction
      loop: true, // Ensure looping is enabled
    })
  );

  return (
    <Carousel
      className="relative w-auto h-auto"
      plugins={[autoPlayPlugin.current]}
    >
      <CarouselContent className="flex h-full">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="relative flex-shrink-0 w-full h-full"
          >
            <Card className="w-full h-full">
              <CardContent className="relative h-full p-0">
                <img
                  src={image.source}
                  alt={`Banner ${index}`}
                  className="object-cover w-full h-full"
                />
                {/* Overlay Text and Button */}
                <div className="absolute top-1/2 left-28 transform -translate-y-1/2 p-8 flex flex-col justify-center items-start">
                  <p className="text-sm font-light mb-2">Welcome to Chairy</p>
                  <p className="text-4xl lg:text-6xl font-semibold mb-4 whitespace-pre-line">
                    Best Furniture
                    <br />
                    Collection for your
                    <br />
                    interior.
                  </p>
                  <Button className="bg-blue-lagoon-800 hover:bg-blue-lagoon-900 text-white px-6 py-3 rounded-lg mt-4 flex items-center">
                    Shop now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-16 top-1/2 transform -translate-y-1/2 text-blue-lagoon-800 bg-white p-2 rounded-full" />
      <CarouselNext className="absolute right-16 top-1/2 transform -translate-y-1/2 text-blue-lagoon-800 bg-white p-2 rounded-full" />
    </Carousel>
  );
}

export default BannerCarousel;
