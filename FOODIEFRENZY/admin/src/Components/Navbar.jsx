import { useState } from "react";
import { navLinks, styles } from "../../public/dummyadmin";
import { GiChefToque } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navContainer}>
        <div className={styles.logoSection}>
          <GiChefToque className={styles.logoIcon}></GiChefToque>
          <span className={styles.logoText}>Admin Panel</span>
        </div>

        <button onClick={() => setMenu(!menu)} className={styles.menuButton}>
          {menu ? <FiX></FiX> : <FiMenu></FiMenu>}
        </button>

        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <NavLink
              key={link}
              to={link.href}
              className={({ isActive }) =>
                `${styles.navLinkBase} ${
                  isActive ? styles.navLinkActive : styles.navLinkInactive
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* for mobile  */}
      {menu && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <NavLink
              key={link}
              to={link.href}
              onClick={() => setMenu(!menu)}
              className={({ isActive }) =>
                `${styles.navLinkBase} ${
                  isActive ? styles.navLinkActive : styles.navLinkInactive
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
