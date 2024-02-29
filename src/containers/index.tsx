import { useState } from "react";
import ListField from "../components/list-field";
import SearchField from "../components/search-field";
import styles from "./style.module.scss";
import { useOnClickOutside } from "../helpers/utils";

export const MainContainer = () => {
  const [isActive, setIsActive] = useState(false);

  const blurRef = useOnClickOutside(() => {
    setIsActive(false);
  });

  return (
    <div className={styles.mainContainer} ref={blurRef}>
      <SearchField onFocus={() => setIsActive(true)} isActive={isActive} />
      {isActive && <ListField />}
    </div>
  );
};
