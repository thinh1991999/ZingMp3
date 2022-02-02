import react from "react";
import styles from "./Nav.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { RiFolderMusicLine } from "react-icons/ri";
import { SiRoamresearch } from "react-icons/si";

function Nav() {
  let iconStyles = { fontSize: "24px" };
  return (
    <div className={styles.nav}>
      <div className={styles.navWrap}>
        <div className={styles.logo}>
          <Link to={"/"}> </Link>
        </div>
        <ul className={styles.navList}>
          <li className={clsx(styles.navItem, styles.navItemActive)}>
            <RiFolderMusicLine style={iconStyles} />
            <span>Cá nhân</span>
          </li>
          <li className={styles.navItem}>
            <SiRoamresearch style={iconStyles} />
            <span>Khám phá</span>
          </li>
        </ul>
      </div>
    </div>
    // <h2>nav components</h2>
  );
}

export default Nav;
