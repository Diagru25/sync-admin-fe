import { FC } from "react";
import styles from "components/NotFoundPage/style.module.css";
import { useNavigate } from "react-router-dom";
import { DEFAULT } from "routes/route.constant";
import { useMediaQuery } from "@mantine/hooks";

const NotFoundPage: FC = () => {
  const isMobile = useMediaQuery(`(max-width: 768px)`);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(DEFAULT);
  };

  return (
    <div className={styles.bgImage}>
      <div className={styles.title}>Lost your way?</div>
      <div className={styles.description}>
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </div>
      <div className={styles.wrapperBtn}>
        <div className={styles.button} onClick={handleRedirect}>
          Trang chủ
        </div>
      </div>
      {!isMobile ? (
        <div className={styles.error}>
          Error code <span>404</span>
        </div>
      ) : null}
    </div>
  );
};

export default NotFoundPage;
