import {
  ListItem,
  completeListItem,
  deleteListItemById,
  patchListItem,
} from "../../services/list-item-services";
import styles from "./Item.module.scss";
import {format} from "date-fns";
import Button from "../Button/Button";
import AddModal from "../AddModal/AddModal";
import {useState} from "react";
import {faCheck, faTrash, faWrench} from "@fortawesome/free-solid-svg-icons";

interface ItemProps {
  item: ListItem;
  fetchData: () => unknown;
}

const Item: React.FC<ItemProps> = ({item, fetchData}) => {
  const [editOpen, setEditOpen] = useState(false);

  let urgency: string = "";
  if (!item.isDone) {
    urgency = item.urgency;
  } else {
    urgency = "gold";
  }

  let position = "";
  if (item.id % 2 === 0) {
    position = "left";
  } else {
    position = "right";
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteListItemById(item.id).then(() => fetchData());
    }
  };

  const handleEdit = () => {
    setEditOpen(!editOpen);
  };

  const handleComplete = () => {
    if (window.confirm("Have you REALLY completed this task?")) {
      completeListItem(item.id, item).then(() => fetchData());
    } else {
      console.log("Thats what I thought!");
    }
  };

  const editItem = async (data: ListItem) => {
    await patchListItem(item.id, data).then(() => {
      fetchData();
      setEditOpen(false);
    });
  };

  return (
    <div className={`${styles.wrap} ${styles[urgency]} ${styles[position]}`}>
      <div className={styles.wrap__btns}>
        {!item.isDone && (
          <Button
            handleClick={handleEdit}
            icon={faWrench}
            border={urgency}></Button>
        )}
        <Button
          handleClick={handleDelete}
          icon={faTrash}
          border={urgency}></Button>
        {!item.isDone && (
          <Button
            handleClick={handleComplete}
            icon={faCheck}
            border={urgency}></Button>
        )}
      </div>
      <div className={`${styles.line} ${styles[urgency]}`}></div>
      <div className={styles.wrap__body}>
        <div className={styles.wrap__body__head}>
          <p className={styles.wrap__body__head_title}>{item.title}</p>
          <div className={`${styles.vertline} ${styles[urgency]}`}></div>
          <p className={styles.wrap__body__head_category}>{item.category}</p>
        </div>
        <div className={`${styles.line} ${styles[urgency]}`}></div>
        <div className={styles.wrap__body_content}>
          <p>{item.content}</p>
        </div>
        <div className={`${styles.line} ${styles[urgency]}`}></div>
        <div className={styles.wrap__body_date}>
          <p className={styles.wrap__body_date_p}>
            {item.isDone
              ? "Completed!"
              : `Created ${format(new Date(item.createdAt), "dd/MM/yy")}`}
          </p>
        </div>
      </div>
      {editOpen && (
        <AddModal closeModal={handleEdit} submit={editItem} item={item} />
      )}
    </div>
  );
};

export default Item;
