import { useDispatch } from "react-redux";
import useIcons from "../../helpers/icons";
import TagsContainer from "../tags";
import styles from "./style.module.scss";
import { SearchFieldProps } from "./interface";
import { debounce } from "../../helpers/utils";

const SearchField = ({ onFocus, isActive, toggleClick }: SearchFieldProps) => {
  const dispatch = useDispatch();
  const { SearchBarIcon } = useIcons();

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch.list.updateSearchQuery(e.target.value);
  }, 500);

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="search" className={styles.searchContainer}>
        <TagsContainer />
        <input
          name="search"
          id="search"
          type="text"
          onChange={handleChange}
          defaultValue=""
          onFocus={onFocus}
          tabIndex={2}
        ></input>
      </label>
      <span className={isActive ? styles.open : ""} onClick={toggleClick}>
        <SearchBarIcon fill="#475569" />
      </span>
    </div>
  );
};

export default SearchField;
