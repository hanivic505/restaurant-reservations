import React from "react";

function Header() {
  return (
    <header className="flex justify-between p-4">
      Reservations
      <nav>
        <ul className="flex direction-row gap-4">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
