import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, HashRouter } from "react-router-dom";
import styles from "./Header.module.scss";
import { HeaderButton, HeaderFormSuggest } from "..";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { actions, SEARCH_API } from "../../store";

function Header() {
  const { blackHeader, activeSearch } = useSelector((state) => state);
  const [searchText, setSearchText] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggest, setSuggest] = useState([
    "vui lắm nha",
    "thương em đến",
    "em đừng đi",
    "zing choice",
  ]);

  const inputRef = useRef(null);
  const formRef = useRef(null);
  const deleteBtnRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  const handlePrevPage = () => {};

  const handleNextPage = () => {};

  const handleSearchForm = () => {
    dispatch(actions.setActiveSearch(true));
  };

  const handleOutSearch = () => {
    // dispatch(actions.setActiveSearch(false));
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.length > 0) {
      navigate(`/Search/${searchText}`);
      dispatch(actions.setActiveSearch(false));
      inputRef.current.blur();
    }
  };

  const handleSubmitBtn = () => {
    if (searchText.length > 0) {
      navigate(`/Search/${searchText}`);
      dispatch(actions.setActiveSearch(false));
      inputRef.current.blur();
    }
  };

  const handleDeleteSearchText = () => {
    setSearchText("");
    inputRef.current.focus();
  };

  useEffect(() => {
    if (searchText.trim().length > 0) {
      fetchSearch();
    }
  }, [searchText]);

  const event = (e) => {
    if (!formRef.current.contains(e.target)) {
      dispatch(actions.setActiveSearch(false));
    }
  };

  useEffect(() => {
    window.addEventListener("click", event);

    return () => {
      window.removeEventListener("click", event);
    };
  }, []);

  const headerBg = blackHeader ? styles.headerBg : "";

  const finalClass = clsx(styles.features, headerBg);

  return (
    <header className={finalClass}>
      <div className={styles.featuresLeft}>
        <div className={styles.featuresLeftBtn}>
          <div className={styles.leftBtn} onClick={handlePrevPage}>
            <HeaderButton disable={true}>
              <HiOutlineArrowLeft />
            </HeaderButton>
          </div>
          <div className={styles.rightBtn} onClick={handleNextPage}>
            <HeaderButton disable={true}>
              <HiOutlineArrowRight />
            </HeaderButton>
          </div>
        </div>
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
                onBlur={handleOutSearch}
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
      <div className={styles.featuresRight}>
        <HeaderButton circle={true}>
          <FiSettings />
        </HeaderButton>
        <HeaderButton circle={true} white={true}>
          <FaUserAlt />
        </HeaderButton>
      </div>
    </header>
  );
}

export default Header;