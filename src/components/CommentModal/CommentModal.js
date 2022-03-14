import React, { useRef, useEffect, useState } from "react";
import styles from "./CommentModal.module.scss";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

function CommentModal() {
  const dispatch = useDispatch();

  const { showComment, currentUser } = useSelector((state) => state);

  const [chatList, setChatList] = useState([]);
  const [infoUser, setInfoUser] = useState([]);

  const containerRef = useRef(null);
  const wrapRef = useRef(null);

  const handleClose = () => {
    dispatch(
      actions.setShowComment({
        show: false,
        id: "",
      })
    );
  };

  const eventClickCloseModal = (e) => {
    if (!wrapRef.current.contains(e.target)) {
      dispatch(
        actions.setShowComment({
          show: false,
          id: "",
        })
      );
    }
  };

  useEffect(() => {
    containerRef.current.addEventListener("click", eventClickCloseModal);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("click", eventClickCloseModal);
      }
    };
  }, []);

  useEffect(() => {
    if (showComment.show) {
      const chatRef = ref(db, "chatMessages/" + showComment.id);

      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        const userCommentList = [];
        const newChatList = [];
        const newInfoList = [];
        for (let key in data) {
          const { sentBy } = data[key];
          if (!userCommentList.includes(sentBy)) {
            userCommentList.push(sentBy);
          }
          newChatList.push(data[key]);
        }
        userCommentList.forEach((item) => {
          const chatRef = ref(db, "users/" + item);
          onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            newInfoList.push(data);
          });
        });
        setChatList(newChatList);
        setInfoUser(newInfoList);
      });
    }
  }, []);
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.wrap} ref={wrapRef}>
        <div className={styles.top}>
          <h2>Bình luận</h2>
          <button className={styles.btn} onClick={handleClose}>
            <ButtonIcon
              fill={true}
              popper={{
                show: true,
                msg: "Đóng",
                position: "CenterUp",
              }}
            >
              <MdOutlineClose />
            </ButtonIcon>
          </button>
        </div>
        <div className={styles.center}>
          <span>{chatList.length} bình luận</span>
          <ul className={styles.commentList}>
            {chatList.map((chat) => {
              const { mess, sentBy, created } = chat;
              const { email, profile_picture, username } = infoUser.filter(
                (item) => item.id === sentBy
              )[0];
              const newData = new Date(created * 1000);
              const currentDay = new Date();
              const time = `${newData.getFullYear()}/${
                newData.getMonth() + 1 < 10
                  ? `0${newData.getMonth() + 1}`
                  : newData.getMonth() + 1
              }/${
                newData.getDate() < 10
                  ? `0${newData.getDate()}`
                  : newData.getDate()
              }-${
                newData.getHours() < 10
                  ? `0${newData.getHours()}`
                  : newData.getHours()
              }:${
                newData.getMinutes() < 10
                  ? `0${newData.getMinutes()}`
                  : newData.getMinutes()
              }`;

              return (
                <li className={styles.commentItem}>
                  <div className={styles.leftItem}>
                    <img
                      src={
                        profile_picture ||
                        `https://firebasestorage.googleapis.com/v0/b/my-project-2b635.appspot.com/o/unknown.jpg?alt=media&token=0ac6668a-86e6-426a-bf15-18f4e93cacd5`
                      }
                      alt=""
                    />
                  </div>
                  <div className={styles.rightItem}>
                    <h4>
                      {username || email}
                      <span>{time}</span>
                    </h4>
                    <p>{mess}</p>
                    <div className={styles.itemBtnWrap}>
                      <button className={styles.btn}>
                        <ButtonIcon
                          fill={true}
                          popper={{
                            show: true,
                            msg: "Thích",
                            position: "CenterUp",
                          }}
                        >
                          <AiOutlineLike />
                        </ButtonIcon>
                      </button>
                      <span>0</span>
                      <button className={styles.btn}>
                        <ButtonIcon
                          fill={true}
                          popper={{
                            show: true,
                            msg: "Không thích",
                            position: "CenterUp",
                          }}
                        >
                          <AiOutlineDislike />
                        </ButtonIcon>
                      </button>
                      <span>0</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.bottom}>
          <div className={styles.noLogin}>
            <RiErrorWarningLine /> <p>Hãy đăng nhập để tham gia bình luận</p>
            <a href="">Đăng nhập</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
