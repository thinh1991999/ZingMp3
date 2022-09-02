import react, { useEffect, useRef, useState } from "react";
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

  const { btnMobile } = useSelector((state) => state);
  const { currentUser, loginStatus } = useSelector((state) => state.root);

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
  const handleNav = (index) => {
    // switch (index) {
    //   case 0: {
    //     if (currentUser) {
    //       navigate("/Profile");
    //     } else {
    //       dispatch(actions.setShowLogin(true));
    //       dispatch(actions.setShowNavMobile(false));
    //     }
    //     break;
    //   }
    //   case 1:
    //     dispatch(actions.setCurrentNav(1));
    //     navigate("/");
    //     break;
    //   case 2:
    //     dispatch(actions.setCurrentNav(2));
    //     navigate("/ZingChartHome");
    //     break;
    //   case 3:
    //     toast.error("Radio chưa sẵn sàng!");
    //     dispatch(actions.setShowNavMobile(false));
    //     break;
    //   case 4:
    //     toast.error("Theo dõi chưa sẵn sàng!");
    //     dispatch(actions.setShowNavMobile(false));
    //     break;
    //   case 5:
    //     navigate("/NewSong");
    //     dispatch(actions.setCurrentNav(5));
    //     break;
    //   case 6:
    //     toast.error("Thể loại chưa sẵn sàng!");
    //     dispatch(actions.setShowNavMobile(false));
    //     break;
    //   case 7:
    //     dispatch(actions.setCurrentNav(7));
    //     navigate("/Top100");
    //     break;
    //   case 8:
    //     dispatch(actions.setCurrentNav(8));
    //     navigate("/ListMV");
    //     break;
    //   default:
    //     break;
    // }
  };

  const event = (e) => {
    if (
      !navRef.current.contains(e.target) &&
      !btnMobile.current.contains(e.target)
    ) {
      dispatch(actions.setShowNavMobile(false));
    } else if (btnMobile.current.contains(e.target)) {
      dispatch(actions.setShowNavMobile(true));
    }
  };

  useEffect(() => {
    // window.addEventListener("click", event);
    return () => {
      // window.removeEventListener("click", event);
    };
  }, [btnMobile]);
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
                <a
                  onClick={() => dispatch(actions.setShowLogin(true))}
                  key={index}
                  className={styles.navItem}
                >
                  {icon}
                  <span className={styles.itemName}>{name}</span>
                  {hint ? (
                    <span className={styles.itemHint}>{hint}</span>
                  ) : null}
                </a>
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
