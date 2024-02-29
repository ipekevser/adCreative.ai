import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../store/interface";
import { RootState } from "../../store";
import { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Spinner from "../spinner";
import CardContainer from "../card";

const ListField = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const list = useSelector((state: RootState) => state.list.results);
  const searchQuery = useSelector((state: RootState) => state.list.searchQuery);

  const errorMessage = useSelector(
    (state: RootState) => state.list.errorMessage
  );

  const { loading } = useSelector(
    (state: RootState) => state.loading.models.list
  );

  useEffect(() => {
    dispatch.list.load("init");
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [searchQuery]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current!;
    if (scrollHeight - scrollTop - clientHeight < 50) {
      dispatch.list.load("load");
    }
  };

  const render = () => {
    if (loading && list?.length === 0 && !errorMessage) {
      return (
        <div className={styles.helpercontainer}>
          <Spinner />
        </div>
      );
    } else if (errorMessage) {
      return (
        <div className={styles.helpercontainer}>
          {errorMessage.toUpperCase()}
        </div>
      );
    } else {
      return (
        <>
          {list?.map((character: Character) => (
            <CardContainer key={character.id} character={character} />
          ))}
        </>
      );
    }
  };

  return (
    <div className={styles.listContainer} ref={containerRef}>
      {render()}
    </div>
  );
};

export default ListField;
