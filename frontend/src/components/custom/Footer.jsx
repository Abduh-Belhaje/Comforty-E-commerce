// src/components/Footer.js
import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "../../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <div className="border border-black py-5">
      <footer className="bg-white my-3 text-slate-400 border-y mx-5 text-sm py-4 flex justify-around">
        <div className="w-fit flex flex-col  space-y-4">
          <div className="">
            <img src={Logo} alt="Loading..." className="w-40 h-10" />
          </div>
          <div className="w-80">
            <p>
              Vivamus tristique odio sit amet velit semper, eu posuere turpis
              interdum. Cras egestas purus
            </p>
          </div>

          <div className="container mx-auto flex justify-center space-x-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white text-slate-400 transition-colors duration-300 hover:border-[#1877F2] hover:text-[#1877F2]"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white text-slate-400 transition-colors duration-300 hover:border-[#1DA1F2] hover:text-[#1DA1F2]"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white text-slate-400 transition-colors duration-300 hover:border-[#C13584] hover:text-[#C13584]"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white text-slate-400 transition-colors duration-300 hover:border-[#FF0000] hover:text-[#FF0000]"
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white text-slate-400 transition-colors duration-300 hover:border-[#E60023] hover:text-[#E60023]"
            >
              <FontAwesomeIcon icon={faPinterest} size="lg" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-start space-x-6">
          {/* Categories Section */}
          <div className="links flex flex-col items-start test-slate-400">
            <span className="text-slate-400 mb-2 font-bold">Categories</span>
            <a href="/#" className="hover:underline mb-1">
              Sofa
            </a>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Armchair
            </a>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Wing Chair
            </a>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Desk Chair
            </a>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Wooden Chair
            </a>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Park Bench
            </a>
          </div>

          {/* Support Section */}
          <div className="links flex flex-col items-start text-slate-400">
            <span className="text-slate-400 mb-2 font-bold">Support</span>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Help & Support
            </a>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Terms & Conditions
            </a>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Privacy Policy
            </a>
            <a
              href="/#"
              className="hover:underline hover:text-blue-lagoon-800 mb-1"
            >
              Help
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label htmlFor="newsletter" className="font-bold">
            NEWSLETTER
          </label>
          <div className="flex space-x-2">
            <Input
              type="email"
              id="newsletter"
              className="border border-input h-11 w-72 "
            />
            <Button className="bg-blue-lagoon-800 w-32 h-11 hover:bg-blue-lagoon-900">
              Subscribe
            </Button>
          </div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
