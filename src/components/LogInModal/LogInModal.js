import React, { useEffect, useState, useRef } from "react";
import styles from "./LogInModal.module.scss";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { actions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { db, auth } from "../../firebase";
import clsx from "clsx";
import PlayingIcon from "../PlayingIcon/PlayingIcon";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { MdOutlineClose } from "react-icons/md";

function LogInModal() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state);

  const [state, setState] = useState("LOGIN");
  const [info, setInfo] = useState({
    header: "Đăng nhập",
    change: "Bạn chưa có tài khoản",
    btn: "Đăng ký",
  });
  const [error, setError] = useState({
    type: "",
    msg: "",
  });
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [cfPwError, setCfPwError] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cfPw, setCfPw] = useState("");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const emailRef = useRef(null);

  const changeState = () => {
    if (state === "LOGIN") {
      setState("SIGNUP");
      return;
    }
    setState("LOGIN");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "LOGIN") {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          dispatch(actions.setShowLogin(false));
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/invalid-email") {
            setEmailError("Email không hợp lệ");
          } else if (errorCode === "auth/internal-error") {
            setPwError("Mật khẩu không hợp lệ");
          } else if (errorCode === "auth/wrong-password") {
            setPwError("Sai mật khẩu");
          } else if (errorCode === "auth/user-not-found") {
            setEmailError("Không tồn tại account này");
          } else if (errorCode === "auth/too-many-requests") {
            setError({
              type: "",
              msg: "Bạn đã nhập sai quá nhiều,vui lòng thử lại sau",
            });
          }
          setLoading(false);
        });
    } else {
      const valid = setEmailValid() & setPwValid() & setCfPwValid();
      if (valid) {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, pw)
          .then((userCredential) => {
            const user = userCredential.user;
            set(ref(db, "users/" + user.uid), {
              id: user.uid,
              email: email,
              profile_picture: "",
            });
            signOut(auth)
              .then(() => {})
              .catch((error) => {});
            setError({
              type: "SUCCESS",
              msg: "Đăng ký thành công",
            });
            setEmail("");
            setPw("");
            setCfPw("");
            setLoading(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
              setEmailError("Tài khoản này đã tồn tại");
            }
            setLoading(false);
          });
      }
    }
  };

  const setEmailValid = () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.match(re)) {
      return true;
    } else {
      setEmailError("Trường này phải là email");
      return false;
    }
  };

  const handleBlurEmail = (e) => {
    if (state === "SIGNUP") {
      setEmailValid();
    }
  };

  const handleFocusEmail = () => {
    setEmailError("");
  };

  const handleFocusPW = () => {
    setPwError("");
  };

  const setPwValid = () => {
    if (pw.length < 6) {
      setPwError("Mật khẩu phải nhiều hơn 6 kí tự");
      return false;
    }
    return true;
  };

  const handleBlurPW = () => {
    if (state === "SIGNUP") {
      setPwValid();
    }
  };

  const handleFocusCfPW = () => {
    setCfPwError("");
  };

  const setCfPwValid = () => {
    if (pw.length >= 6 && pw !== cfPw) {
      setCfPwError("Xác nhận mật khẩu sai");
      return false;
    }
    return true;
  };

  const handleBlurCfPW = () => {
    if (state === "SIGNUP") {
      setCfPwValid();
    }
  };

  useEffect(() => {
    if (!loading) {
      if (state === "LOGIN") {
        setInfo({
          header: "Đăng nhập",
          change: "Bạn chưa có tài khoản",
          btn: "Đăng ký",
        });
      } else {
        setInfo({
          header: "Đăng ký",
          change: "Bạn đã có tài khoản",
          btn: "Đăng nhập",
        });
      }
      setError({
        type: "",
        msg: "",
      });
      setEmailError("");
      setPwError("");
      setCfPwError("");
    }
  }, [state]);

  const eventClickCloseModal = (e) => {
    if (!wrapRef.current.contains(e.target) && !loading) {
      dispatch(actions.setShowLogin(false));
    }
  };

  useEffect(() => {
    containerRef.current.addEventListener("click", eventClickCloseModal);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("click", eventClickCloseModal);
      }
      dispatch(actions.setPopperInfo({ show: false }));
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.wrap} ref={wrapRef}>
        <h2>
          {info.header}{" "}
          <button onClick={() => dispatch(actions.setShowLogin(false))}>
            <ButtonIcon
              popper={{
                show: true,
                msg: "Đóng",
                position: "CenterUp",
              }}
            >
              <MdOutlineClose />
            </ButtonIcon>
          </button>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            onFocus={handleFocusEmail}
            onBlur={handleBlurEmail}
            className={emailError.length > 0 ? styles.error : ""}
          />
          {emailError.length !== 0 && <p>{emailError}</p>}
          <input
            type="password"
            placeholder="Mật khẩu"
            value={pw}
            onFocus={handleFocusPW}
            onBlur={handleBlurPW}
            onChange={(e) => setPw(e.target.value)}
            className={pwError.length > 0 ? styles.error : ""}
          />
          {pwError.length !== 0 && <p>{pwError}</p>}
          {state !== "LOGIN" && (
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={cfPw}
              onFocus={handleFocusCfPW}
              onBlur={handleBlurCfPW}
              onChange={(e) => setCfPw(e.target.value)}
              className={cfPwError.length > 0 ? styles.error : ""}
            />
          )}
          {cfPwError.length !== 0 && <p>{cfPwError}</p>}
          {error.msg.length !== 0 && (
            <p
              className={clsx(
                styles.mess,
                error.type === "SUCCESS" && styles.messSuccess
              )}
            >
              {error.msg}
            </p>
          )}

          {loading ? (
            <PlayingIcon loading={true} />
          ) : (
            <button type="submit" onClick={handleSubmit}>
              <PrimaryButton
                info={{
                  msg: info.header,
                  bgGray: true,
                }}
              />
            </button>
          )}
        </form>
        <p className={styles.change}>
          {info.change} ? <button onClick={changeState}>{info.btn}</button>
        </p>
      </div>
    </div>
  );
}

export default LogInModal;
