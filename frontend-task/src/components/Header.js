import React from "react";
import logo from "../assets/images/Logotop.png";
import focus from "../assets/images/focus.png";
import bright from "../assets/images/bright.png";
import notify from "../assets/images/notification.png";
import user from "../assets/images/user1.png"

const Header = () => {
  return (
    <div>
      <header className="flex justify-between items-center border-b border-gray-300 p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Cloudi5" className="h-16" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-8">
          <span role="img" aria-label="search">
            <img src={focus} alt="focus" className="h-7 w-7 cursor-pointer" />
          </span>
          <span role="img" aria-label="sun">
            <img src={bright} alt="focus" className="h-7 w-7 cursor-pointer" />
          </span>
          <span role="img" aria-label="notification">
            <img src={notify} alt="focus" className="h-7 w-7 cursor-pointer" />
          </span>
          <span role="img" aria-label="user" >
          <img src={user} alt="focus" className="text-xl cursor-pointer" />
          </span>
        </div>
      </header>

      <main>
        {/* Menu */}
        <div className="flex gap-8 py-5">
          <span className="text-sm cursor-pointer ml-6 font-body">
            Administration <span className="ml-1">▼</span>
          </span>
          <span className="text-sm cursor-pointer font-body">
            Inventory <span className="ml-1">▼</span>
          </span>
        </div>
      </main>
    </div>
  );
};

export default Header;
