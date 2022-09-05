import { useRef } from "react";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import { RiFolderMusicLine } from "react-icons/ri";
import { SiRoamresearch } from "react-icons/si";
import { GiChart } from "react-icons/gi";
import { MdOutlineRadio } from "react-icons/md";
import {
  AiOutlineStar,
  AiOutlineVideoCameraAdd,
  AiOutlineClose,
} from "react-icons/ai";
import { BsNewspaper, BsUiChecksGrid } from "react-icons/bs";
import { FiMusic } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../store";
import styles from "./Nav.module.scss";

function Nav() {
  const dispatch = useDispatch();

  const { loginStatus } = useSelector((state) => state.root);

  const navRef = useRef(null);

  const iconStyles = useRef({ fontSize: "24px" }).current;
  const stateNavTop = useRef([
    {
      name: "Cá Nhân",
      icon: <RiFolderMusicLine style={iconStyles} />,
      link: "/Profile",
      requireLogin: true,
    },
    {
      name: "Khám Phá",
      icon: <SiRoamresearch style={iconStyles} />,
      link: "/",
    },
    {
      name: "#zingchart",
      icon: <GiChart style={iconStyles} />,
      link: "/ZingChartHome",
    },
    {
      name: "Radio",
      icon: <MdOutlineRadio style={iconStyles} />,
      link: "/Radio",
      hint: "live",
    },
    {
      name: "Theo Dõi",
      icon: <BsNewspaper style={iconStyles} />,
      link: "/Follow",
    },
    {
      name: "Nhạc Mới",
      icon: <FiMusic style={iconStyles} />,
      link: "/NewSong",
    },
    {
      name: "Thể Loại",
      icon: <BsUiChecksGrid style={iconStyles} />,
      link: "/Type",
    },
    {
      name: "Top 100",
      icon: <AiOutlineStar style={iconStyles} />,
      link: "/Top100",
    },
    {
      name: "MV",
      icon: <AiOutlineVideoCameraAdd style={iconStyles} />,
      link: "/ListMV",
    },
  ]).current;

  const handleCloseShowNavMobile = () => {
    dispatch(actions.setShowNavMobile(false));
  };

  return (
    <div className={styles.nav} ref={navRef}>
      <div className={styles.navWrap}>
        <div className={styles.logo}>
          <Link to={"/"}> </Link>
          <button onClick={handleCloseShowNavMobile}>
            <AiOutlineClose />
          </button>
        </div>
        <div className={styles.navList}>
          {stateNavTop.map((nav, index) => {
            const { name, icon, link, hint, requireLogin } = nav;
            if (index > 4) {
              return null;
            }
            if (requireLogin && !loginStatus) {
              return (
                <button
                  onClick={() => dispatch(actions.setShowLogin(true))}
                  key={index}
                  className={styles.navItem}
                >
                  {icon}
                  <span className={styles.itemName}>{name}</span>
                  {hint ? (
                    <span className={styles.itemHint}>{hint}</span>
                  ) : null}
                </button>
              );
            }
            return (
              <NavLink
                to={link}
                key={index}
                className={({ isActive }) => {
                  return isActive
                    ? clsx(styles.navItem, styles.navItemActive)
                    : styles.navItem;
                }}
              >
                {icon}
                <span className={styles.itemName}>{name}</span>
                {hint ? <span className={styles.itemHint}>{hint}</span> : null}
              </NavLink>
            );
          })}
        </div>
        <div className={styles.divide}></div>
        <div className={styles.navFeatures}>
          <div className={styles.navList}>
            {stateNavTop.map((nav, index) => {
              const { name, icon, link } = nav;
              if (index < 5) {
                return null;
              }
              return (
                <NavLink
                  to={link}
                  key={index}
                  className={({ isActive }) => {
                    return isActive
                      ? clsx(styles.navItem, styles.navItemActive)
                      : styles.navItem;
                  }}
                >
                  {icon}
                  <span className={styles.itemName}>{name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
