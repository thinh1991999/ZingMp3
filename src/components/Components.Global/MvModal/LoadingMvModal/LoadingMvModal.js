import clsx from "clsx";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../store";
import ButtonIcon from "../../ButtonIcon/ButtonIcon";
import Loading from "../../Loading/Loading";

import styles from "./LoadingMvModal.module.scss";

export default function LoadingMvModal() {
  const dispatch = useDispatch();
  const { showMvModal, idShow, showSmallScreen } = useSelector(
    (state) => state.mv
  );
  const handleCloseModal = () => {
    dispatch(actions.setIdMvModal(null));
    dispatch(actions.setShowMvModal(false));
    dispatch(actions.setShowSmallScreen(false));
  };

  return (
    <div
      className={clsx(
        styles.loading,
        showSmallScreen ? styles.loadingSmall : null
      )}
    >
      <Loading size={1} small={showSmallScreen} />
      <button onClick={handleCloseModal}>
        <ButtonIcon
          fill={true}
          size={24}
          popper={{
            show: true,
            msg: "Đóng",
            position: "CenterDown",
          }}
        >
          <AiOutlineClose />
        </ButtonIcon>
      </button>
    </div>
  );
}
