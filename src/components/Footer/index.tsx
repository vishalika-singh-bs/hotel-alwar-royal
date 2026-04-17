import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-accent mb-4">Hotel Alwar Royal</h3>
            <p className="text-sm leading-relaxed">
              A modern luxury hotel in Alwar blending comfort, affordability, and contemporary
              design for both leisure and business travelers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/rooms" className="hover:text-accent transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-accent transition-colors">
                  Amenities
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Alwar, Rajasthan, India</li>
              <li>Phone: +91 XXXXX XXXXX</li>
              <li>Email: info@hotelalwarroyal.com</li>
            </ul>
          </div>

          {/* Booking */}
          <div>
            <h4 className="text-white font-semibold mb-4">Book Your Stay</h4>
            <p className="text-sm mb-4">Experience luxury at an affordable price.</p>
            <Link
              to="/booking"
              className="inline-block bg-accent text-primary-dark px-6 py-2 rounded font-semibold text-sm hover:bg-accent-light transition-colors"
            >
              Reserve Now
            </Link>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Hotel Alwar Royal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
