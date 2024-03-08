import {useCallback} from "react";
import styles from "./App.module.scss";
import {useEffect, useState} from "react";
import {
  getAllListItems,
  ListItem,
  createListItem,
} from "./services/list-item-services";
import List from "./containers/List/List";
import Button from "./components/Button/Button";
import AddModal from "./components/AddModal/AddModal";
import {Zoom, ToastContainer} from "react-toastify";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await getAllListItems();
      setListItems(data);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createItem = async (data: ListItem) => {
    await createListItem(data).then(() => {
      fetchData();
      setModalOpen(false);
    });
  };

  const handleClick = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className={styles.app}>
      <div className={styles.top}>
        <h1>My List</h1>
        <Button
          handleClick={handleClick}
          icon={faPlus}
          border={"none"}></Button>
      </div>
      <List items={listItems} fetchData={fetchData} />
      {modalOpen && <AddModal closeModal={handleClick} submit={createItem} />}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </div>
  );
}

export default App;
