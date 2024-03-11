import {useForm} from "react-hook-form";
import {ListItem} from "../../services/list-item-services";
import styles from "./AddModal.module.scss";
import Button from "../Button/Button";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

interface AddModalProps {
  closeModal: () => unknown;
  submit: (data: ListItem) => unknown;
  item?: ListItem;
}

const AddModal: React.FC<AddModalProps> = ({closeModal, submit, item}) => {
  const {register, handleSubmit} = useForm<ListItem>();
  const onSubmit = (data: ListItem) => {
    submit(data);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.wrap__box}>
        <h2 className={styles.wrap__box__head}>
          {item ? "Edit Item!" : "Add new Item!"}
        </h2>
        <form className={styles.form}>
          <input
            {...register("title")}
            placeholder="Title"
            {...(item && {defaultValue: item.title})}
            className={styles.form__title}
          />
          <textarea
            {...register("content")}
            placeholder="Content"
            {...(item && {defaultValue: item.content})}
            className={styles.form__content}
          />
          <select
            {...register("category")}
            className={styles.form__drop}
            defaultValue={item?.category}>
            <option value="developing" className={styles.form__drop_option}>
              Developing
            </option>
            <option value="work" className={styles.form__drop_option}>
              Work
            </option>
            <option value="projects" className={styles.form__drop_option}>
              Projects
            </option>
            <option value="shopping" className={styles.form__drop_option}>
              Shopping
            </option>
            <option value="chores" className={styles.form__drop_option}>
              Chores
            </option>
            <option value="general" className={styles.form__drop_option}>
              General
            </option>
          </select>
          <select
            {...register("urgency")}
            className={styles.form__drop}
            defaultValue={item?.urgency}>
            <option value="high" className={styles.form__drop_option}>
              High
            </option>
            <option value="medium" className={styles.form__drop_option}>
              Medium
            </option>
            <option value="low" className={styles.form__drop_option}>
              Low
            </option>
          </select>
          <Button
            handleClick={handleSubmit(onSubmit)}
            icon={faCheck}
            border={"default"}
            testid={"modalBtn"}></Button>
        </form>
      </div>
      <Button
        handleClick={closeModal}
        icon={faXmark}
        border={"default"}></Button>
    </div>
  );
};

export default AddModal;
