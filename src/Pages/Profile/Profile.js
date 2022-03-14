import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.scss";
import { Loading, PlayingIcon, PrimaryButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { ref, set } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, auth, storage } from "../../firebase";
import { actions } from "../../store";

function Profile() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state);
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

  // if (!loading) {
  //   return <Loading size={50} />;
  // }
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
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            console.log("aaa");
            set(ref(db, "users/" + currentUser.id + "/profile_picture"), url);
          })
          .catch((error) => {
            console.log(error);
          });
        setMess({
          type: "SUCCESS",
          msg: "Lưu thành công",
        });
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

  useEffect(() => {
    const { name, phone, location } = currentUser;
    setName(name);
    setPhone(phone);
    setLocation(location);
  }, [currentUser]);

  useEffect(() => {
    dispatch(actions.setCurrentNav(0));
  }, []);

  const { email, profile_picture } = currentUser;

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <Row>
          <Col lg={4} className={styles.left}>
            <img src={profile_picture} alt="" />
            <p>{email}</p>
          </Col>
          <Col lg={6} className={styles.center}>
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
          <Col lg={2} className={styles.right}></Col>
        </Row>
      </div>
    </div>
  );
}

export default Profile;
