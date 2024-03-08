import {useForm} from "react-hook-form";
import {ListItem} from "../../services/list-item-services";
import styles from "./AddModal.module.scss";
import Button from "../Button/Button";

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
            <option value="coding" className={styles.form__drop_option}>
              Coding
            </option>
            <option value="cats" className={styles.form__drop_option}>
              Cats
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
          <Button handleClick={handleSubmit(onSubmit)}>Done</Button>
        </form>
      </div>
      <Button handleClick={closeModal}>Close</Button>
    </div>
  );
};

export default AddModal;
