import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../store/interface";
import { CardProps } from "./interface";
import styles from "./style.module.scss";
import { RootState } from "../../store";

const CardContainer = ({ character }: CardProps) => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state: RootState) => state.list.searchQuery);
  const selectedCharacters = useSelector(
    (state: RootState) => state.list.selectedCharacters
  );

  const handleChange = (character: Character) => {
    dispatch.list.checkedCharacters(character);
  };

  const makeSearchQueryBold = (
    name: string,
    searchQuery: string
  ): React.ReactNode => {
    const parts = name.split(new RegExp(`(${searchQuery})`, "gi"));

    const result = parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );

    return result;
  };

  return (
    <div className={styles.card}>
      <input
        type="checkbox"
        onChange={() => handleChange(character)}
        checked={selectedCharacters?.some((char) => char.id === character.id)}
        tabIndex={3}
      />
      <div>
        <img src={character.image} alt="characters profile" />
      </div>
      <div>
        <div>{makeSearchQueryBold(character.name, searchQuery ?? "")}</div>
        <div className={styles.episodes}>
          {character.episode.length} Episodes
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
