import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import ButtonIcon from "../ButtonIcon/ButtonIcon";

import styles from "./Artist.module.scss";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { ultils } from "../../../Share";

function Artist({ data }) {
  const { name, totalFollow, thumbnailM, alias, thumbnail } = data;

  const navigate = useNavigate();

  const handleSinger = () => {
    navigate(`/Singer/${alias}`);
  };

  const newFollow = ultils.getNumberText(totalFollow);
  return (
    <div className={styles.item}>
      <div className={styles.itemWrap}>
        <div className={styles.itemImg} onClick={handleSinger}>
          <img src={thumbnailM || thumbnail} alt="" />
          <div className={styles.imgLayer} />
          <div className={styles.imgIcon}>
            <ButtonIcon circle={true} topic={true} size={40} fontSize={40}>
              <BsPlayCircle />
            </ButtonIcon>
          </div>
        </div>
        <Link to={`/Singer/${alias}`} className={styles.itemTitle}>
          {name}
        </Link>
        <span className={styles.itemSub}>{newFollow} quan tâm</span>
        <div className={styles.btnWrap}>
          <PrimaryButton
            info={{
              msg: "quan tâm",
              bgGray: true,
            }}
          >
            <AiOutlineUserAdd />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default Artist;
