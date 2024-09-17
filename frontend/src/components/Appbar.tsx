import { useState, useEffect } from "react";
import { decode } from "jsonwebtoken";

export const Appbar = () => {
  // const [userInitials, setUserInitials] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     const decodedToken = decode(token) as any; // Use correct type for decodedToken
  //     if (decodedToken?.name) {
  //       const initials = decodedToken.name
  //         .split(" ")
  //         .map((namePart: string) => namePart.charAt(0).toUpperCase())
  //         .join("");
  //       setUserInitials(initials);
  //     }
  //   }
  // }, []);

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <UserMenu userInitials="JS" />
        <NavLinks />
      </div>
    </nav>
  );
};

export const Logo = () => {
  return (
    <a
      href="https://flowbite.com/"
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <span className="self-center text-2xl font-semibold whitespace-nowrap">
        Payment
      </span>
    </a>
  );
};

export const NavLinks = () => {
  return (
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-user"
    >
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

interface UserMenuProps {
  userInitials: string;
}

export const UserMenu = ({ userInitials }: UserMenuProps) => {
  return (
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {userInitials || "JS"}
          </span>
        </div>
      </button>

      <div
        className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900">Bonnie Green</span>
          <span className="block text-sm text-gray-500 truncate">
            name@flowbite.com
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
