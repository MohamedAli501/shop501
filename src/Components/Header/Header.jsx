import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  return (
    <header className="bg-slate-900 h-16 flex items-center text-white shadow-md">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-white text-xl md:text-3xl uppercase">
          shop <span className="text-orange-400">501</span>{" "}
        </Link>
        <nav>
          <ul className="list-none flex items-center space-x-6 text-lg uppercase">
            <li>
              <Link
                to="/wishlist"
                className="flex items-center hover:text-orange-300 text-sm md:text-xl"
              >
                {" "}
                <AiOutlineHeart className="mr-1" /> wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center hover:text-orange-300 text-sm md:text-xl"
              >
                {" "}
                <BsCart4 className="mr-1" /> cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
