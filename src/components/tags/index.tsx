import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { RootState } from "../../store";
import useIcons from "../../helpers/icons";
import { Character } from "../../store/interface";

const TagsContainer = () => {
  const dispatch = useDispatch();
  const { CloseIcon } = useIcons();

  const selectedCharacters = useSelector(
    (state: RootState) => state.list.selectedCharacters
  );

  const handleRemoveCharacter = (character: Character) => {
    dispatch.list.checkedCharacters(character);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    character: Character
  ) => {
    if (event.key === "Backspace") {
      handleRemoveCharacter(character);
    }
  };

  return (
    <>
      {selectedCharacters?.map((character) => (
        <div
          className={styles.tag}
          key={character.id}
          tabIndex={1}
          onKeyDown={(event) => handleKeyDown(event, character)}
        >
          <div className={styles.tagName}>{character.name}</div>
          <div
            className={styles.tagIcon}
            onClick={() => handleRemoveCharacter(character)}
          >
            <CloseIcon />
          </div>
        </div>
      ))}
    </>
  );
};

export default TagsContainer;
