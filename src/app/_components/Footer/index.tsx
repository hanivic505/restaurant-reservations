import React from "react";

function Footer() {
  return (
    <footer className="flex justify-center items-center gap-4 pb-4">
      Reservations &copy; 2023{" "}
      <span className="w-0.5 bg-white block h-16 md:h-8"></span>
      <nav>
        <ul className="flex flex-col md:flex-row gap-4">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
