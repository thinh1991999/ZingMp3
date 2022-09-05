import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.scss";
import { ButtonIcon, PlayingIcon, PrimaryButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { ref, set } from "firebase/database";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { signOut } from "firebase/auth";
import { db, auth, storage } from "../../firebase";
import { actions } from "../../store";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { constant } from "../../Share";
import { memo } from "react";

function Profile() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.song.currentSong);
  const playing = useSelector((state) => state.song.playing);
  const loginStatus = useSelector((state) => state.root.loginStatus);
  const currentUser = useSelector((state) => state.root.currentUser);

  const [location, setLocation] = useState({ country: "", region: "" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [imgError, setImgError] = useState("");
  const [picture, setPicture] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [mess, setMess] = useState({
    type: "",
    msg: "",
  });

  const imgInputRef = useRef(null);

  const getValidPhone = () => {
    const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (phone.trim().length === 0) {
      setPhoneError("Trường này không được để trống");
      return false;
    } else {
      if (phone.trim().match(re)) {
        return true;
      } else {
        setPhoneError("Sai cú pháp SĐT-Thiếu số");
        return false;
      }
    }
  };

  const handleBlurPhone = () => {
    getValidPhone();
  };

  const handleFocusPhone = () => {
    setPhoneError("");
    setMess("");
  };

  const getValidName = () => {
    if (name.trim().length === 0) {
      setNameError("Trường này không được bỏ trống");
      return false;
    }
    return true;
  };

  const getValidImg = () => {
    const { length } = imgInputRef.current.files;
    if (length === 1) {
      const {
        0: { type },
      } = imgInputRef.current.files;
      if (type === "image/png" || type === "image/jpeg") {
        return true;
      } else {
        setImgError("Ảnh đại diện phải là ảnh");
        return false;
      }
    }
    return true;
  };

  const handleBlurName = () => {
    getValidName();
  };

  const handleFocusName = () => {
    setNameError("");
    setMess("");
  };

  const handleFocusImg = () => {
    setImgError("");
    setMess("");
  };
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const valid = getValidName() & getValidPhone() & getValidImg();
    if (valid) {
      const { length } = imgInputRef.current.files;
      setSaveLoading(true);
      await set(ref(db, "users/" + currentUser.id + "/name"), name);
      await set(ref(db, "users/" + currentUser.id + "/phone"), phone);
      await set(ref(db, "users/" + currentUser.id + "/location"), location);
      if (length === 1) {
        const storageRef = refStorage(storage, currentUser.id);
        await uploadBytes(storageRef, imgInputRef.current.files[0]).then(
          (snapshot) => {
            console.log("Uploaded a blob or file!");
          }
        );
        await getDownloadURL(refStorage(storage, currentUser.id))
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = () => {};
            xhr.open("GET", url);
            xhr.send();
            set(ref(db, "users/" + currentUser.id + "/profile_picture"), url);
          })
          .catch((error) => {});
        setMess({
          type: "SUCCESS",
          msg: "Lưu thành công",
        });
        imgInputRef.current.value = null;
        setSaveLoading(false);
      } else {
        setMess({
          type: "SUCCESS",
          msg: "Lưu thành công",
        });
        setSaveLoading(false);
      }
    }
  };

  const handleLogOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    if (currentUser) {
      const { name, phone, location } = currentUser;
      name && setName(name);
      phone && setPhone(phone);
      location && setLocation(location);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
      toast.error("Bạn cần phải đăng nhập để vào trang này");
    }
  }, [loginStatus, navigate]);

  useEffect(() => {
    if (!playing) {
      document.title = "Trang cá nhân";
    }
  }, [playing, currentSong]);

  useEffect(() => {
    dispatch(actions.setBGHeader(true));
    dispatch(actions.setShowNavMobile(false));
    // !idCurrentSong && dispatch(actions.setTitle("Profile"));
    return () => {
      dispatch(actions.setPopperInfo({ show: false }));
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <Row>
          <Col lg={4} sm={10} xs={10} className={styles.left}>
            <img
              src={currentUser?.profile_picture || constant.unknowUserImg}
              alt=""
            />
            <p>{currentUser?.email}</p>
          </Col>
          <Col sm={2} xs={2} className={styles.mobile}>
            <button onClick={handleLogOut}>
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Đăng xuất",
                  position: "CenterUp",
                }}
                fill={true}
              >
                <AiOutlineLogout />
              </ButtonIcon>
            </button>
          </Col>
          <Col lg={6} sm={12} className={styles.center}>
            <h2>Chỉnh sửa thông tin</h2>
            <form onSubmit={handleSaveProfile}>
              <label htmlFor="name">Họ và tên</label>
              <input
                id="name"
                type="text"
                placeholder="Họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={handleFocusName}
                onBlur={handleBlurName}
                className={nameError.length > 0 ? styles.error : ""}
              />
              {nameError.length !== 0 && <p>{nameError}</p>}
              <label htmlFor="phone">SĐT</label>
              <input
                id="Phone"
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={handleFocusPhone}
                onBlur={handleBlurPhone}
                className={phoneError.length > 0 ? styles.error : ""}
              />
              {phoneError.length !== 0 && <p>{phoneError}</p>}
              <div className={styles.country}>
                <div className={styles.countryLeft}>
                  <label htmlFor="">Quốc gia</label>
                  <CountryDropdown
                    value={location.country}
                    onChange={(val) => setLocation({ country: val })}
                  />
                </div>
                <div className={styles.countryRight}>
                  <label htmlFor="">Thành phố/Vị trí</label>
                  <RegionDropdown
                    country={location.country}
                    value={location.region}
                    onChange={(val) =>
                      setLocation({ ...location, region: val })
                    }
                  />
                </div>
              </div>
              <label htmlFor="picture">Ảnh đại diện</label>
              <input
                id="picture"
                type="file"
                onChange={(e) => setPicture(e.target.value)}
                ref={imgInputRef}
                onFocus={handleFocusImg}
                className={imgError.length > 0 ? styles.error : ""}
              />
              {imgError.length !== 0 && <p>{imgError}</p>}
              {mess.length !== 0 && (
                <p className={mess.type === "SUCCESS" ? styles.success : ""}>
                  {mess.msg}
                </p>
              )}
              <div className={styles.btnWrap}>
                {saveLoading ? (
                  <PlayingIcon loading={true} />
                ) : (
                  <button type="submit" onClick={handleSaveProfile}>
                    <PrimaryButton
                      info={{
                        msg: "Lưu Thông tin",
                        // bgGray: true,
                      }}
                    ></PrimaryButton>
                  </button>
                )}
              </div>
            </form>
          </Col>
          <Col lg={2} sm={12} className={styles.right}>
            <button onClick={handleLogOut}>
              <ButtonIcon
                popper={{
                  show: true,
                  msg: "Đăng xuất",
                  position: "CenterUpRight",
                }}
                fill={true}
              >
                <AiOutlineLogout />
              </ButtonIcon>
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default memo(Profile);
