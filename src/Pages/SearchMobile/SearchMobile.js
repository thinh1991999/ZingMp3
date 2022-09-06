import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./SearchMobile.module.scss";
import { actions } from "../../store";
import HeaderFormSuggest from "../../components/Components.Global/HeaderFormSuggest/HeaderFormSuggest";
import httpService from "../../Services/http.service";
import { memo } from "react";

function SearchMobile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.song.currentSong);

  const [searchText, setSearchText] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const suggest = useRef([
    "vui lắm nha",
    "thương em đến",
    "em đừng đi",
    "zing choice",
  ]).current;
  const [activeSearch, setActiveSearch] = useState(false);

  const inputRef = useRef(null);
  const formRef = useRef(null);
  const deleteBtnRef = useRef(null);

  const handleSearchForm = () => {
    setActiveSearch(true);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteSearchText = () => {
    setSearchText("");
    inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.length > 0) {
      navigate(`/Search/${searchText}`);
      inputRef.current.blur();
    }
  };

  const handleSubmitBtn = () => {
    if (searchText.length > 0) {
      navigate(`/Search/${searchText}`);
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    let searchDelay;
    let isApiSubcribed = true;
    if (searchText.trim().length > 0) {
      setLoading(true);
      searchDelay = setTimeout(() => {
        httpService.getSearch(searchText).then((res) => {
          if (isApiSubcribed) {
            const {
              data: { artists = [], songs = [], top },
            } = res.data;
            setDataSearch([
              top,
              ...artists.splice(0, 2),
              ...songs.splice(0, 3),
            ]);
            setLoading(false);
          }
        });
      }, 400);
      return () => {
        clearTimeout(searchDelay);
        isApiSubcribed = false;
      };
    } else {
      setDataSearch([]);
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    const event = (e) => {
      if (!formRef.current.contains(e.target)) {
        setActiveSearch(false);
      }
    };
    window.addEventListener("click", event);
    dispatch(actions.setShowNavMobile(false));
    return () => {
      window.removeEventListener("click", event);
    };
  }, [dispatch]);

  useEffect(() => {
    !currentSong && dispatch(actions.setTitle(`Tìm kiếm`));
  }, [currentSong, dispatch]);

  useEffect(() => {
    const sizeWindow = window.innerWidth;
    if (sizeWindow > 426) navigate("/");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <form
          className={clsx(styles.form, activeSearch && styles.formActive)}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className={styles.formContainer}>
            <div className={styles.formIcon} onClick={handleSubmitBtn}>
              <AiOutlineSearch />
            </div>
            <div className={styles.formInput}>
              <input
                type="text"
                placeholder="Nhập tên bài hát,nghệ sĩ,MV,...."
                value={searchText}
                onFocus={handleSearchForm}
                onChange={handleSearchText}
                ref={inputRef}
              />
            </div>
            <div
              className={clsx(
                styles.formIconRight,
                searchText.length > 0 && styles.formIconRightActive
              )}
              onClick={handleDeleteSearchText}
              ref={deleteBtnRef}
            >
              <MdOutlineClose />
            </div>
            {activeSearch && (
              <HeaderFormSuggest
                data={dataSearch}
                suggest={suggest}
                searchText={searchText}
                loading={loading}
                setSearchText={setSearchText}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(SearchMobile);
