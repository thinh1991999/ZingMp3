import React, { useRef, useEffect, useState } from "react";
import styles from "./CommentModal.module.scss";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { db } from "../../firebase";
import { onValue, ref, push, update, child } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import clsx from "clsx";

function CommentModal() {
  const dispatch = useDispatch();

  const { showComment, currentUser } = useSelector((state) => state);

  const [chatList, setChatList] = useState([]);
  const [infoUser, setInfoUser] = useState([]);
  const [chat, setChat] = useState("");
  const [chatError, setChatError] = useState(false);

  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const ulRef = useRef(null);

  const handleClose = () => {
    dispatch(
      actions.setShowComment({
        show: false,
        id: "",
      })
    );
  };

  const pushMess = () => {
    const newPostKey = push(
      child(ref(db), "chatMessages/" + showComment.id)
    ).key;

    const postData = {
      mess: chat.trim(),
      sentBy: currentUser.id,
      created: Timestamp.fromDate(new Date()).seconds,
    };

    const updates = {};
    updates["/chatMessages/" + showComment.id + "/" + newPostKey] = postData;
    updates["/chats/" + showComment.id] = {
      lastMess: newPostKey,
      members: currentUser.id,
    };
    return update(ref(db), updates);
  };

  const handleChat = (e) => {
    e.preventDefault();
    if (chat.trim().length > 10 || chat.trim().length === 0) {
      setChatError("Bình luận không được rỗng hoặc nhiều hơn 100 kí tự");
    } else {
      pushMess();
      setChat("");
    }
  };

  const openLogin = (e) => {
    e.preventDefault();
    dispatch(
      actions.setShowComment({
        show: false,
        id: "",
      })
    );
    dispatch(actions.setShowLogin(true));
  };

  const cloneLikeAndDislike = async (id) => {
    let cloneLikesList = {};
    let cloneDisLikesList = {};
    const likeListRef = ref(
      db,
      "chatMessages/" + showComment.id + "/" + id + "/likes"
    );
    const disLikeListRef = ref(
      db,
      "chatMessages/" + showComment.id + "/" + id + "/dislikes"
    );
    await onValue(likeListRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        cloneLikesList = { ...data };
      }
    });
    await onValue(disLikeListRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        cloneDisLikesList = { ...data };
      }
    });
    return {
      likes: { ...cloneLikesList },
      dislikes: { ...cloneDisLikesList },
    };
  };

  const handleDisLikeComment = (id) => {
    if (currentUser) {
      cloneLikeAndDislike(id).then((data) => {
        const updates = {};
        delete data.likes[currentUser.id];
        updates["/chatMessages/" + showComment.id + "/" + id + "/" + "likes"] =
          {
            ...data.likes,
          };
        updates[
          "/chatMessages/" + showComment.id + "/" + id + "/" + "dislikes"
        ] = {
          ...data.dislikes,
          [currentUser.id]: 1,
        };
        return update(ref(db), updates);
      });
    }
  };

  const handleLikeComment = (id) => {
    if (currentUser) {
      cloneLikeAndDislike(id).then((data) => {
        const updates = {};
        delete data.dislikes[currentUser.id];
        updates["/chatMessages/" + showComment.id + "/" + id + "/" + "likes"] =
          {
            ...data.likes,
            [currentUser.id]: 1,
          };
        updates[
          "/chatMessages/" + showComment.id + "/" + id + "/" + "dislikes"
        ] = {
          ...data.dislikes,
        };
        return update(ref(db), updates);
      });
    }
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
      dispatch(actions.setPopperInfo({ show: false }));
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
          newChatList.push({
            id: key,
            data: data[key],
          });
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
  }, [showComment]);

  useEffect(() => {
    ulRef.current.scrollTop = ulRef.current.scrollHeight;
  }, [chatList]);

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
          <ul className={styles.commentList} ref={ulRef}>
            {infoUser.length > 0 &&
              chatList.map((chat, index) => {
                const {
                  mess,
                  sentBy,
                  created,
                  likes = {},
                  dislikes = {},
                } = chat.data;
                const liked =
                  currentUser !== null ? likes[currentUser.id] === 1 : false;
                const disliked =
                  currentUser !== null ? dislikes[currentUser.id] === 1 : false;
                const user = infoUser.filter((item) => item.id === sentBy)[0];
                if (user) {
                  const { email, profile_picture, username } = user;
                  const newData = new Date(created * 1000);
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
                    <li key={index} className={styles.commentItem}>
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
                          <button
                            className={clsx(
                              styles.btn,
                              liked && styles.btnActive
                            )}
                            onClick={() => handleLikeComment(chat.id)}
                          >
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
                          <span>{Object.keys(likes).length}</span>
                          <button
                            className={clsx(
                              styles.btn,
                              disliked && styles.btnActive
                            )}
                            onClick={() => handleDisLikeComment(chat.id)}
                          >
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
                          <span>{Object.keys(dislikes).length}</span>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
        <div className={styles.bottom}>
          {currentUser ? (
            <form onSubmit={handleChat}>
              <div className={styles.chatWrap}>
                <input
                  type="text"
                  placeholder="Nhập bình luận"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  className={chatError.length > 0 ? styles.error : ""}
                  onFocus={() => setChatError("")}
                />
                <button type="submit" onClick={handleChat}>
                  <PrimaryButton
                    info={{
                      msg: "Bình luận",
                      bgGray: true,
                    }}
                  ></PrimaryButton>
                </button>
              </div>
              {chatError.length > 0 ? <p>{chatError}</p> : ""}
            </form>
          ) : (
            <div className={styles.noLogin}>
              <RiErrorWarningLine /> <p>Hãy đăng nhập để tham gia bình luận</p>
              <a onClick={openLogin}>Đăng nhập</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
