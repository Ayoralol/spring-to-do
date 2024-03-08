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

interface ItemProps {
  item: ListItem;
  fetchData: () => unknown;
}

const Item: React.FC<ItemProps> = ({item, fetchData}) => {
  const [editOpen, setEditOpen] = useState(false);

  let urgency = "";
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
    } else {
      console.log("Pussy");
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
        {!item.isDone && <Button handleClick={handleEdit}>Edit</Button>}
        <Button handleClick={handleDelete}>Delete</Button>
        {!item.isDone && <Button handleClick={handleComplete}>Complete</Button>}
      </div>
      <div className={styles.wrap__body}>
        <h2>{item.title}</h2>
        <p>{item.category}</p>
        <p>{item.content}</p>
        <p>Created {format(new Date(item.createdAt), "dd/MM/yy")}</p>
      </div>
      {editOpen && (
        <AddModal closeModal={handleEdit} submit={editItem} item={item} />
      )}
    </div>
  );
};

export default Item;
