import {ListItem} from "../../services/list-item-services";
import Item from "../../components/Item/Item";
import styles from "./List.module.scss";

interface ListProps {
  items: ListItem[];
  fetchData: () => unknown;
}

const List: React.FC<ListProps> = ({items, fetchData}) => {
  return (
    <div className={styles.list}>
      {items.map((item: ListItem) => {
        return <Item key={item.id} item={item} fetchData={fetchData} />;
      })}
    </div>
  );
};

export default List;
