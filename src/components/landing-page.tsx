/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const FoodHutLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Poppins',sans-serif]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>

      {/* Top Section with Hero */}
      <section 
        className="relative h-[600px] bg-cover bg-no-repeat text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url('/images/bg.jpg')`
        }}
      >
        {/* Navigation */}
        <nav className="flex h-20 w-full items-center justify-between px-4 md:px-20 flex-wrap relative z-50">
          <div className="text-white text-3xl font-semibold">
            <Link href="/">foodhut.</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white text-xl md:hidden focus:outline-none"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-wrap list-none items-center">
            <li className="mx-7">
              <a href="#menu" className="text-gray-200 no-underline text-sm font-medium px-2 py-2 rounded transition-all duration-300 hover:text-black hover:bg-white">
                Menu
              </a>
            </li>
            <li className="mx-7">
              <a href="#about" className="text-gray-200 no-underline text-sm font-medium px-2 py-2 rounded transition-all duration-300 hover:text-black hover:bg-white">
                About
              </a>
            </li>
            <li className="mx-7">
              <a href="#reviews" className="text-gray-200 no-underline text-sm font-medium px-2 py-2 rounded transition-all duration-300 hover:text-black hover:bg-white">
                Reviews
              </a>
            </li>
            <li className="mx-7">
              <a href="#contact" className="text-gray-200 no-underline text-sm font-medium px-2 py-2 rounded transition-all duration-300 hover:text-black hover:bg-white">
                Contact
              </a>
            </li>
            <li className="ml-16">
              <Link href="/dashboard" className="text-sm font-medium px-2 py-2 rounded bg-white text-black transition-all duration-300 hover:bg-red-900 hover:text-white">
                Go to Dashboard
              </Link>
            </li>
          </ul>

          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="fixed top-20 right-0 bg-black h-screen w-full text-center block md:hidden transition-all duration-300 ease-in-out z-40">
              <li className="w-full my-10">
                <a href="#menu" className="block text-xl hover:text-red-900" onClick={() => setMenuOpen(false)}>
                  Menu
                </a>
              </li>
              <li className="w-full my-10">
                <a href="#about" className="block text-xl hover:text-red-900" onClick={() => setMenuOpen(false)}>
                  About
                </a>
              </li>
              <li className="w-full my-10">
                <a href="#reviews" className="block text-xl hover:text-red-900" onClick={() => setMenuOpen(false)}>
                  Reviews
                </a>
              </li>
              <li className="w-full my-10">
                <a href="#contact" className="block text-xl hover:text-red-900" onClick={() => setMenuOpen(false)}>
                  Contact
                </a>
              </li>
              <li className="w-full my-10">
                <Link href="/dashboard" className="inline-block text-lg bg-white text-black px-6 py-2 rounded hover:bg-red-900 hover:text-white" onClick={() => setMenuOpen(false)}>
                  Order Now
                </Link>
              </li>
            </ul>
          )}
        </nav>

        {/* Hero Content */}
        <div className="mx-4 my-32 p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-bold w-full md:w-1/2 shadow-[3px_8px_0_rgb(147,1,1)]">
            BEST FOOD JOINTS IN AKURE
          </h1>
          <p className="my-8 text-xl font-bold">
            It&apos;s not just food, it&apos;s an experience.
          </p>
          <Link href="/dashboard" className="inline-block px-8 py-4 bg-red-900 rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
            Explore Restaurants
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="my-24 mx-5">
        <h2 className="text-center text-3xl p-5">
          Extraordinary Taste And Experience
        </h2>
        <div className="flex flex-wrap">
          {/* About Item 1 */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full p-8 mt-12">
            <div className="w-full md:w-2/5 md:ml-32 mt-8 md:mt-16 text-center md:text-left">
              <h3 className="my-2">We Make Sure Your Food Arrive On Time</h3>
              <p className="w-full md:w-4/5 leading-6 tracking-wide">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ut enim
                ad minim veniam, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <img src="/images/fd.jpg" alt="Fast delivery" className="max-w-[350px] rounded-lg" />
            </div>
          </div>

          {/* About Item 2 */}
            <div className="flex flex-col md:flex-row-reverse justify-between items-center w-11/12 mx-auto p-8 mt-12">
            <div className="w-full md:w-2/5 md:ml-32 mt-8 md:mt-16 text-center md:text-left">
              <h3 className="my-2">High Quality Food Material</h3>
              <p className="w-full md:w-4/5 leading-6 tracking-wide">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ut enim
                ad minim veniam, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <img src="/images/cook.jfif" alt="Various menu" className="max-w-[350px] rounded-lg" />
            </div>
          </div>

          {/* About Item 3 */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full p-8 mt-12">
            <div className="w-full md:w-2/5 md:ml-32 mt-8 md:mt-16 text-center md:text-left">
              <h3 className="my-2">Various Menu You Can Pick</h3>
              <p className="w-full md:w-4/5 leading-6 tracking-wide">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ut enim
                ad minim veniam, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <img src="/images/buffet.jfif" alt="Various menu" className="max-w-[350px] rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section id="menu" className="my-24">
        <h2 className="text-center text-3xl p-5">Popular Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-8 my-12">
          {/* Food Item 1 */}
          <div className="bg-gray-100 text-black rounded-xl relative">
            <img src="/images/pasta.jfif" alt="Spaghetti" className="w-full max-h-[300px] object-cover rounded-t-xl" />
            <div className="p-4 text-center">
              <h3 className="font-semibold">Spaghetti & Meatballs</h3>
              <p className="mb-8 text-sm">This spaghetti and meatball recipe has all the classic flavors you know and love.</p>
              <span className="text-lg font-bold mr-4">$5.00</span>
              <Link href="/dashboard" className="inline-block px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-white hover:text-black transition-colors">
                Add To Cart
              </Link>
              <span className="absolute top-1 right-1 bg-gray-300 text-gray-700 px-2 py-1 rounded-xl text-sm">
                ⭐4.95
              </span>
            </div>
          </div>

          {/* Food Item 2 */}
          <div className="bg-gray-100 text-black rounded-xl relative">
            <img src="/images/fried-rice.jfif" alt="Fried Rice" className="w-full max-h-[300px] object-cover rounded-t-xl" />
            <div className="p-4 text-center">
              <h3 className="font-semibold">Fried Rice</h3>
              <p className="mb-8 text-sm">This fried-rice recipe has all the classic flavors you know and love.</p>
              <span className="text-lg font-bold mr-4">$7.50</span>
              <Link href="/dashboard" className="inline-block px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-white hover:text-black transition-colors">
                Add To Cart
              </Link>
              <span className="absolute top-1 right-1 bg-gray-300 text-gray-700 px-2 py-1 rounded-xl text-sm">
                ⭐5.00
              </span>
            </div>
          </div>

          {/* Food Item 3 */}
          <div className="bg-gray-100 text-black rounded-xl relative">
            <img src="/images/jollof-rice.jfif" alt="Jollof Rice" className="w-full max-h-[300px] object-cover rounded-t-xl" />
            <div className="p-4 text-center">
              <h3 className="font-semibold">Jollof Rice</h3>
              <p className="mb-8 text-sm">This jollof recipe has all the classic flavors you know and love.</p>
              <span className="text-lg font-bold mr-4">$6.50</span>
              <Link href="/dashboard" className="inline-block px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-white hover:text-black transition-colors">
                Add To Cart
              </Link>
              <span className="absolute top-1 right-1 bg-gray-300 text-gray-700 px-2 py-1 rounded-xl text-sm">
                ⭐5.00
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative max-h-[500px] my-12 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url('/images/fod.JPG')`
        }}
      >
        <div className="text-center py-16">
          <h2 className="text-4xl font-bold">Food Recipe Of The Day</h2>
          <p className="text-2xl font-medium mb-10">Come And Try This Out</p>
          <Link href="/dashboard" className="inline-block px-8 py-4 bg-red-900 rounded-lg hover:bg-white hover:text-black transition-colors">
            Order Now
          </Link>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="mt-12">
        <h2 className="text-center text-3xl p-5">Our Chefs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-8 my-12">
          <div><img src="/images/chef1.jfif" alt="Chef 1" className="w-3/4 max-h-[300px] mt-5 rounded-xl object-cover" /></div>
          <div><img src="/images/chef2.jpg" alt="Chef 2" className="w-3/4 max-h-[300px] mt-5 rounded-xl object-cover" /></div>
          <div><img src="/images/chef3.jpg" alt="Chef 3" className="w-3/4 max-h-[300px] mt-5 rounded-xl object-cover" /></div>
          <div><img src="/images/chef4.jfif" alt="Chef 4" className="w-3/4 max-h-[300px] mt-5 rounded-xl object-cover" /></div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="mt-12">
        <h2 className="text-center text-3xl p-5">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 my-5">
          <div className="bg-gray-100 text-black p-4 rounded-xl text-sm relative">
            <p className="mb-4">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua,
              Ut enim ad minim veniam, quis nostrud exercitation ullamco.&quot;
            </p>
            <h4 className="mt-8 ml-10">Jeanette Harmon</h4>
            <img src="/images/jeanette.jpg" alt="Jeanette" className="rounded-full w-8 absolute -top-4 left-4" />
          </div>
          <div className="bg-gray-100 text-black p-4 rounded-xl text-sm relative">
            <p className="mb-4">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua,
              Ut enim ad minim veniam, quis nostrud exercitation ullamco.&quot;
            </p>
            <h4 className="mt-8 ml-10">Patrick Abrams</h4>
            <img src="/images/patrick.jpg" alt="Patrick" className="rounded-full w-8 absolute -top-4 left-4" />
          </div>
          <div className="bg-gray-100 text-black p-4 rounded-xl text-sm relative">
            <p className="mb-4">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua,
              Ut enim ad minim veniam, quis nostrud exercitation ullamco.&quot;
            </p>
            <h4 className="mt-8 ml-10">Kira Whittle</h4>
            <img src="/images/kira.jpg" alt="Kira" className="rounded-full w-8 absolute -top-4 left-4" />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
        className="relative max-h-[400px] my-24 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url('/images/pizza.jpg')`
        }}
      >
        <div className="text-center py-20 relative">
          <h3 className="text-2xl mb-4">Subscribe To Our Newsletter & Get The Latest News</h3>
          <div className="flex justify-center items-center gap-0">
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-80 px-5 py-3 rounded-l-xl border border-white text-black"
            />
            <button className="bg-red-900 text-white px-5 py-3 rounded-r-xl border border-red-900 hover:bg-white hover:text-black transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-white h-24 text-center">
        <p className="pt-20 text-xs">foodhut. &copy; 2022 Pearlep</p>
      </footer>

      {/* FontAwesome CDN */}
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v6.1.2/css/all.css"
        integrity="sha384-fZCoUih8XsaUZnNDOiLqnby1tMJ0sE7oBbNk2Xxf5x8Z4SvNQ9j83vFMa/erbVrV"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default FoodHutLanding;