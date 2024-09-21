import React, { useState } from "react";
import { Trash2, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useProductContext } from "../../../contexte/ProductContext";

function Watchlist() {
  const [searchTerm, setSearchTerm] = useState("");
  const { watchlist, removeFromWatchlist, bag, addToBag } = useProductContext();
  const [watchlistItems, setWatchlistItems] = useState(watchlist);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveItem = (name) => {
    // Use the removeFromWatchlist function to remove the item
    removeFromWatchlist(name);
    // Update the watchlist state after removal
    setWatchlistItems(watchlistItems.filter((item) => item.name !== name));
  };

  const handleAddToCart = (id) => {
    console.log(`Added item ${id} to cart`);
    // In a real application, you would also add the item to the cart (bag)
    addToBag(id);
  };

  const filteredItems = watchlistItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Watchlist</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search watchlist..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
      </div>
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Your watchlist is empty or no items match your search.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.name}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>${item.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="object-cover rounded-md"
                    style={{ width: "100%", height: "100%" }}
                  />
                  {!item.inStock && (
                    <Badge
                      variant="destructive"
                      className="absolute top-2 right-2"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the item from your watchlist.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRemoveItem(item.name)}
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  onClick={() => handleAddToCart(item.id)}
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
