import { useDispatch } from "react-redux";
import useIcons from "../../helpers/icons";
import { debounce } from "../../helpers/utils";
import TagsContainer from "../tags";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { SearchFieldProps } from "./interface";

const SearchField = ({ onFocus, isActive }: SearchFieldProps) => {
  const dispatch = useDispatch();
  const { SearchBarIcon } = useIcons();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    handleChangeSearchParam();
  }, [value]);

  const handleChangeSearchParam = debounce(() => {
    dispatch.list.updateSearchQuery(value);
  }, 500);

  return (
    <label htmlFor="search" className={styles.searchContainer}>
      <TagsContainer />
      <input
        name="search"
        id="search"
        type="text"
        onChange={handleChange}
        value={value}
        onFocus={onFocus}
        tabIndex={2}
      ></input>
      <span className={isActive ? styles.open : ""}>
        <SearchBarIcon fill="#475569" />
      </span>
    </label>
  );
};

export default SearchField;
