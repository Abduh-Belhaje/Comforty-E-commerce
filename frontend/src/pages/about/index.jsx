import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Award, Truck, Recycle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          About ChairCraft
        </h1>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 mb-6">
            Founded in 2010, ChairCraft has been at the forefront of ergonomic
            and stylish seating solutions. Our passion for comfort and design
            drives us to create chairs that not only look great but also provide
            unparalleled support for your body.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            With over a decade of experience, we've perfected the art of chair
            craftsmanship, combining traditional techniques with modern
            technology to deliver seating that exceeds expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Quality Craftsmanship
              </h3>
              <p className="text-gray-600">
                Each chair is meticulously crafted to ensure durability and
                comfort.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <Truck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We ensure your chair reaches you quickly and in perfect
                condition.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <Recycle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                We use sustainable materials and practices in our manufacturing
                process.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Our Story
          </h2>
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="ChairCraft workshop"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6">
            ChairCraft began in a small workshop with a simple idea: to create
            chairs that people love to sit in. Our founder, Jane Doe, combined
            her background in ergonomics with her passion for design to create
            our first line of chairs.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Today, we've grown into a team of dedicated craftspeople, designers,
            and customer service experts, all united by our mission to bring
            comfort and style to homes and offices around the world.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Experience ChairCraft?
          </h2>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full text-lg">
            Shop Now <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
