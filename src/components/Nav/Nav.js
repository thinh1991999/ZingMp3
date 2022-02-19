import react, { useState } from "react";
import styles from "./Nav.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { RiFolderMusicLine } from "react-icons/ri";
import { SiRoamresearch } from "react-icons/si";
import { GiChart } from "react-icons/gi";
import { MdOutlineRadio } from "react-icons/md";
import { AiOutlineStar, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BsNewspaper, BsUiChecksGrid } from "react-icons/bs";
import { FiMusic } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../store";
import { toast } from "react-toastify";

function Nav() {
  let iconStyles = { fontSize: "24px" };
  const [stateNavTop, setStateNav] = useState([
    {
      name: "Cá Nhân",
      icon: <RiFolderMusicLine style={iconStyles} />,
    },
    {
      name: "Khám Phá",
      icon: <SiRoamresearch style={iconStyles} />,
    },
    {
      name: "#zingchart",
      icon: <GiChart style={iconStyles} />,
    },
    {
      name: "Radio",
      icon: <MdOutlineRadio style={iconStyles} />,
    },
    {
      name: "Theo Dõi",
      icon: <BsNewspaper style={iconStyles} />,
    },
    {
      name: "Nhạc Mới",
      icon: <FiMusic style={iconStyles} />,
    },
    {
      name: "Thể Loại",
      icon: <BsUiChecksGrid style={iconStyles} />,
    },
    {
      name: "Top 100",
      icon: <AiOutlineStar style={iconStyles} />,
    },
    {
      name: "MV",
      icon: <AiOutlineVideoCameraAdd style={iconStyles} />,
    },
  ]);

  const { currentNav } = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNav = (index) => {
    console.log(index);
    switch (index) {
      case 1:
        dispatch(actions.setCurrentNav(1));
        navigate("/");
        break;
      case 2:
        dispatch(actions.setCurrentNav(2));
        navigate("/ZingChartHome");
        break;
      case 3:
        toast.error("Radio chưa sẵn sàng!");
        break;
      case 4:
        toast.error("Theo dõi chưa sẵn sàng!");
        break;
      case 5:
        toast.error("Nhạc mới chưa sẵn sàng!");
        break;
      case 6:
        toast.error("Thể loại chưa sẵn sàng!");
        break;
      case 7:
        dispatch(actions.setCurrentNav(7));
        navigate("/Top100");
        break;
      case 8:
        dispatch(actions.setCurrentNav(8));
        navigate("/ListMV");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.nav}>
      <div className={styles.navWrap}>
        <div className={styles.logo}>
          <Link to={"/"}> </Link>
        </div>
        <ul className={styles.navList}>
          {stateNavTop.map((nav, index) => {
            const { name, icon } = nav;
            if (index > 4) {
              return;
            }
            if (index === 3) {
              return (
                <li
                  key={index}
                  className={clsx(
                    styles.navItem,
                    currentNav === index && styles.navItemActive
                  )}
                  onClick={() => handleNav(index)}
                >
                  {icon}
                  <span className={styles.itemName}>{name}</span>
                  <span className={styles.itemHint}>live</span>
                </li>
              );
            }
            return (
              <li
                key={index}
                onClick={() => handleNav(index)}
                className={clsx(
                  styles.navItem,
                  currentNav === index && styles.navItemActive
                )}
              >
                {icon}
                <span className={styles.itemName}>{name}</span>
              </li>
            );
          })}
        </ul>
        <div className={styles.divide}></div>
        <div className={styles.navFeatures}>
          <ul className={styles.navList}>
            {stateNavTop.map((nav, index) => {
              const { name, icon } = nav;
              if (index < 5) {
                return;
              }
              if (name === "Radio") {
                <li
                  key={index}
                  className={clsx(
                    styles.navItem,
                    currentNav === index && styles.navItemActive
                  )}
                  onClick={() => handleNav(index)}
                >
                  {icon}
                  <span className={styles.itemName}>{name}</span>
                  <span className={styles.itemHint}>live</span>
                </li>;
              }
              return (
                <li
                  onClick={() => handleNav(index)}
                  key={index}
                  className={clsx(
                    styles.navItem,
                    currentNav === index && styles.navItemActive
                  )}
                >
                  {icon}
                  <span className={styles.itemName}>{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
    // <h2>nav components</h2>
  );
}

export default Nav;
