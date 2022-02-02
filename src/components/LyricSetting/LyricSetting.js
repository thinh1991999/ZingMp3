import clsx from "clsx";
import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./LyricSetting.module.scss";

function LyricSetting({ data }) {
  const { bg, setBg, sizes, textSize, setTextSize } = data;

  const bgRef = useRef(null);
  const sizeRef = useRef(null);

  const handleChangeBg = () => {
    setBg(!bg);
  };

  const handleChangeSize = (name) => {
    setTextSize(name);
  };

  useEffect(() => {
    if (bgRef) {
      bgRef.current.checked = bg;
    }
  }, [bg]);

  const activeCheckBox = bg ? styles.checkboxActive : "";

  return (
    <div className={styles.setting}>
      <div className={styles.wrap}>
        <ul>
          <li>
            <label className={styles.labelFirst} htmlFor="bg">
              Hình nền
            </label>
            <input
              type="checkbox"
              name="bg"
              id="bg"
              onChange={handleChangeBg}
              ref={bgRef}
            />
            <div
              className={clsx(styles.checkbox, activeCheckBox)}
              onClick={handleChangeBg}
            >
              <div className={styles.toggleWrap}>
                <div className={styles.checkboxToggle}></div>
              </div>
            </div>
          </li>
          <li>
            <label className={styles.labelFirst}>Cỡ chữ lời nhạc</label>
            {sizes.map((item, index) => {
              const { name, size } = item;
              const activeLabel = name === textSize ? styles.activeLabel : "";
              return (
                <div key={index}>
                  <input
                    type="radio"
                    id={name}
                    value={name}
                    name="size"
                    ref={sizeRef}
                    checked={name === textSize}
                    onChange={() => handleChangeSize(name)}
                  />
                  <label
                    htmlFor={name}
                    style={{
                      fontSize: `${Math.floor(size / 2)}px`,
                    }}
                    className={clsx(styles.label, activeLabel)}
                    onClick={() => handleChangeSize(name)}
                  >
                    A
                  </label>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(LyricSetting);
