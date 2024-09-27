import axios from "axios";
import { deleteContact, getContactList } from "../../services/ContactsApi";
import styles from "./Modal.module.css";
import { useContext } from "react";
import { ContactContext } from "../../context/ContactProvider";

const Modal = ({ showModal, setShowModal, text, activeRow }) => {
  const { contacts, setContacts } = useContext(ContactContext);
  const handleDelete = async (id) => {
    if (contacts.selectedItems && contacts.selectedItems.length > 0) {
      // multiple delete requests
      await axios.all(
        contacts.selectedItems.map((endpoint) =>
          axios.delete(deleteContact(endpoint))
        )
      );
      const { data } = await axios.get(getContactList());
      // Update state after successful deletion of multiple items
      setContacts({
        type: "DELETE_SELECTED_ITEMS",
        payload: {data,selectedItems:contacts.selectedItems},
      });
    } else {
      await axios.delete(deleteContact(id));
      setContacts({
        type: "DELETE_ITEM",
        payload: id,
      });
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className={styles.container}>
          <span className={styles.cross} onClick={() => setShowModal(false)}>
            X
          </span>
          <div className={styles.chart}>
            <h3>{text}</h3>
            <div className={styles.btnParts}>
              <button
                className={styles.delete}
                onClick={() => handleDelete(activeRow)}
              >
                حذف
              </button>
              <button
                className={styles.cancel}
                onClick={() => setShowModal(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
