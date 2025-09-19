import React from 'react';
import { 
  MapPin, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube,
  Heart,
  ChevronRight,
  GraduationCap,
  Stethoscope,
  Users,
  Droplets,
  UtensilsCrossed
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-10 pb-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        
        {/* About Us */}
        <div>
          <h2 className="text-lg font-bold text-blue-500 mb-3">About Us</h2>
          <p className="text-gray-700 mb-3">
            Ansar Relief Foundation, a 501 (c)(3) non-profit organization (Tax ID 83-1239133)
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            PO Box 1137 Lomita, CA 90717
          </p>
          <p className="flex items-center text-gray-600 mb-4">
            <Mail className="w-4 h-4 mr-2" />
            info@ansarrelief.org
          </p>
          <div className="flex space-x-3">
            <a href="#" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition-colors duration-200">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors duration-200">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Our Causes */}
        <div>
          <h2 className="text-lg font-bold text-blue-500 mb-3">Our Causes</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
              Education
            </li>
            <li className="flex items-center">
              <Stethoscope className="w-4 h-4 mr-2 text-green-600" />
              Mobile Clinic
            </li>
            <li className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-purple-600" />
              Empowerment
            </li>
            <li className="flex items-center">
              <Droplets className="w-4 h-4 mr-2 text-blue-500" />
              Water wells
            </li>
            <li className="flex items-center">
              <UtensilsCrossed className="w-4 h-4 mr-2 text-orange-600" />
              Food Aid
            </li>
          </ul>
        </div>
        
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-blue-500 mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
              Home
            </li>
            <li className="flex items-center hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
              About Us
            </li>
            <li className="flex items-center hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
              Contact Us
            </li>
            <li className="flex items-center hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
              Media
            </li>
            <li className="flex items-center hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
              Donate For
            </li>
          </ul>
        </div>
        
        {/* Transparency */}
        <div>
          <h2 className="text-lg font-bold text-blue-500 mb-3">Embedded In Transparency</h2>
          <p className="text-gray-700 mb-4">
            90 cents of each dollar donated are directed towards programs that serve those in need, 
            with the remaining 10 cents allocated for administrative expenses.
          </p>
          <a href="#"
             className="inline-block border-2 border-black px-4 py-2 font-bold text-black hover:bg-black hover:text-white transition-all duration-300 focus:outline-none">
            Donate Now!
          </a>
        </div>
        
      </div>

      {/* Copyright */}
      <div className="bg-blue-500 text-center text-white py-3 mt-8">
        © copyright 2025 - Ansar Relief Organization
      </div>
    </footer>
  );
};

export default Footer;
