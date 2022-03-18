import react, { useState } from "react";
import clsx from "clsx";
import styles from "./Loading.module.scss";

function Loading({
  loadFull = false,
  size = 80,
  nextPage = false,
  mv = false,
}) {
  const [colors, setColors] = useState([
    "2172b8",
    "18a39b",
    "82c545",
    "f8b739",
    "f06045",
    "ed2861",
    "c12680",
    "5d3191",
  ]);
  const [sizeFinal, setSizeFinal] = useState(size);
  return (
    <div
      className={clsx(styles.loading, {
        [styles.loadingFull]: loadFull,
        [styles.loadingNextPage]: nextPage,
        [styles.loadingMV]: mv,
      })}
    >
      <section className={styles.wrapper}>
        <div className={styles.spinner}>
          {colors.map((color, index) => {
            const newSize = sizeFinal + (index + 1) * 24;
            return (
              <div key={index} className={styles.spinnerOuter}>
                <div
                  className={styles.spinnerInner}
                  style={{
                    width: `${newSize}px`,
                    height: `${newSize}px`,
                    animationTimingFunction: `cubic-bezier(.09, ${
                      0.3 * index
                    } , ${0.12 * index} , .03)`,
                  }}
                >
                  <div
                    className={styles.spinnerTop}
                    style={{
                      borderTopLeftRadius: `${newSize / 2}px`,
                      borderTopRightRadius: `${newSize / 2}px`,
                      borderColor: `#${color}`,
                    }}
                  />
                  <div className={styles.spinnerBottom} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Loading;
