import React, { memo, useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import PrimaryButton from "../../../Components.Global/PrimaryButton/PrimaryButton";
import Loading from "../../../Components.Global/Loading/Loading";
import HttpService from "../../../../Services/http.service";
import styles from "./WarningSliderSong.module.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../../store";

function WarningSliderSong({ info, setShowWarningSong }) {
  const dispatch = useDispatch();

  const currentAlbum = useSelector((state) => state.song.currentAlbum);

  const [loading, setLoading] = useState(true);
  const [songData, setSongData] = useState(null);

  const handlePlaySong = () => {
    const { streamingStatus, album } = songData;
    if (streamingStatus === 1) {
      setShowWarningSong({ show: false });
      if (currentAlbum === album.encodeId) {
        dispatch(actions.playSongSameAlbum(songData));
      } else {
        dispatch(actions.setSongCurrentInfo(songData));
        dispatch(actions.setFetchSong(true));
        HttpService.getAlbum(album.encodeId).then((res) => {
          const {
            data: {
              song: { items },
            },
          } = res.data;
          dispatch(
            actions.playSearchSong({
              album: album.encodeId,
              items: items,
            })
          );
        });
      }
    } else {
      toast.error("Bài hát này chưa được hỗ trợ");
    }
  };

  useEffect(() => {
    setLoading(true);
    HttpService.getSongInfo(info.encodeId).then((res) => {
      const { data } = res.data;
      setSongData(data);
      setLoading(false);
    });
  }, [info]);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.layer}></div>
        <div className={styles.content}>
          {loading ? (
            <Loading size={5} small={true} />
          ) : (
            <>
              <h5>
                Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay
                thế.
              </h5>
              <div className={styles.imgWrap}>
                <img src={songData?.thumbnailM} alt="" />
              </div>
              <h6>{songData?.title}</h6>
              <p>
                {songData?.artists.map((artist, index) => {
                  const { name, id } = artist;
                  return (
                    <span key={id}>
                      {index > 0 ? "," : ""}
                      {name}
                    </span>
                  );
                })}
              </p>
              <button onClick={handlePlaySong}>
                <PrimaryButton
                  info={{
                    msg: "Phát bài hát",
                  }}
                >
                  <BsPlayFill />
                </PrimaryButton>
              </button>
            </>
          )}
          <button
            className={styles.btnCancer}
            onClick={() => setShowWarningSong({ show: false })}
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(WarningSliderSong);
