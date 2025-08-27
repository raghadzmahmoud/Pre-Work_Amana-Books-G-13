// src/app/page.tsx
"use client";

import BookGrid from "./components/BookGrid";
import { books } from "./data/books";
import { CartItem } from "./types";

export default function HomePage() {
  // Simple cart handler for demo purposes
  const handleAddToCart = (bookId: string) => {
    const cartItem: CartItem = {
      id: `${bookId}-${Date.now()}`,
      bookId: bookId,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };

    // Retrieve existing cart from localStorage
    const storedCart = localStorage.getItem("cart");
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    // Check if the book is already in the cart
    const existingItemIndex = cart.findIndex((item) => item.bookId === bookId);

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      cart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch a custom event to notify the Navbar
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="text-center bg-purple-100 p-8 rounded-lg mb-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-2">
          Welcome to the Amana Bookstore!
        </h1>
        <p className="text-lg text-purple-600">
          Your one-stop shop for the best books. Discover new worlds and
          adventures.
        </p>
      </section>

      {/* Book Grid */}
      <BookGrid books={books} onAddToCart={handleAddToCart} />
    </div>
  );
}
