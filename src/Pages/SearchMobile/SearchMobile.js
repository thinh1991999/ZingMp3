import React, { useState, useEffect, useRef } from "react";
import { SEARCH_API } from "../../store";
import clsx from "clsx";
import styles from "./SearchMobile.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { HeaderFormSuggest } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { useNavigate } from "react-router-dom";

function SearchMobile() {
  const { idCurrentSong } = useSelector((state) => state);

  const [searchText, setSearchText] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggest, setSuggest] = useState([
    "vui lắm nha",
    "thương em đến",
    "em đừng đi",
    "zing choice",
  ]);
  const [activeSearch, setActiveSearch] = useState(false);

  const inputRef = useRef(null);
  const formRef = useRef(null);
  const deleteBtnRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const respon = await fetch(`${SEARCH_API}${searchText}`);
      const {
        data: { artists = [], songs = [], top },
      } = await respon.json();
      setDataSearch([top, ...artists.splice(0, 2), ...songs.splice(0, 3)]);
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

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
    if (searchText.trim().length > 0) {
      fetchSearch();
    }
  }, [searchText]);

  const event = (e) => {
    if (!formRef.current.contains(e.target)) {
      setActiveSearch(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", event);
    dispatch(actions.setShowNavMobile(false));
    !idCurrentSong && dispatch(actions.setTitle(`SearchMobile`));
    return () => {
      window.removeEventListener("click", event);
    };
  }, []);

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

export default SearchMobile;
