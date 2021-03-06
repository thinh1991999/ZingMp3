import React, { useEffect, useState } from "react";
import styles from "./Album.module.scss";
import { Row, Col } from "react-bootstrap";
import { AlbumLeft, AlbumRight, Artists, Loading } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ALBUM_API, actions } from "../../store";

function Album() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { album, idCurrentSong } = useSelector((state) => state);
  const dispatch = useDispatch();
  const fetchAlbum = async () => {
    setLoading(true);
    try {
      const respon = await fetch(`${ALBUM_API}${id}`);
      const { data } = await respon.json();
      if (data) {
        dispatch(actions.setAlbum(data));
        setLoading(false);
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  useEffect(() => {
    dispatch(actions.setBGHeader(true));
    dispatch(actions.setCurrentNav(""));
  }, []);

  useEffect(() => {
    if (loading) {
      !idCurrentSong && dispatch(actions.setTitle(`Album`));
    } else {
      !idCurrentSong && dispatch(actions.setTitle(`Album:${album?.title}`));
    }
  }, [album, loading]);

  if (loading) {
    return <Loading size={50} />;
  }

  const {
    title,
    like,
    thumbnailM,
    contentLastUpdate,
    sortDescription,
    song,
    artists,
    encodeId: albumId,
  } = album;

  return (
    <div className={styles.album}>
      <div className={styles.albumContainer}>
        <Row className={styles.albumWrap}>
          <Col xl={4} lg={12}>
            <AlbumLeft
              data={{
                title,
                like,
                image: thumbnailM,
                artists,
                update: contentLastUpdate,
                albumId,
                song,
              }}
            />
          </Col>
          <Col xl={8} lg={12}>
            <AlbumRight title={sortDescription} song={song} />
          </Col>
        </Row>
        <Artists data={artists} />
      </div>
    </div>
  );
}

export default Album;
