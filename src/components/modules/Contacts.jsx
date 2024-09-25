import { useContext, useState } from "react";
import { ContactContext } from "../../context/ContactProvider";
import { Link } from "react-router-dom";
import styles from "./Contacts.module.css";
import axios from "axios";
import { deleteContact } from "../../services/ContactsApi";

const Contacts = () => {
  const [activeRow, setActiveRow] = useState(null);
  const { contacts, setContacts } = useContext(ContactContext);
  const detailsBtnHandler = (id) => {
    setActiveRow(id);
  };
  const handleDelete = async (id) => {
    await axios.delete(deleteContact(id));
    setContacts({
      type: "DELETE_ITEM",
      payload: id,
    });
  };
  return (
    <>
      <table dir="rtl" className={styles.table}>
        <thead>
          <tr>
            <th>شماره</th>
            <th>نام و نام خانوادگی</th>
            <th>ایمیل</th>
            <th>شغل</th>
            <th>تلفن</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {contacts.data?.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.job}</td>
              <td>{contact.phone}</td>
              <td>
                {activeRow === contact.id ? (
                  <div className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.deleteBtn}`}
                      onClick={() => handleDelete(contact.id)}
                    >
                      حذف
                    </button>
                    <Link to={`/edit/${contact.id}`}>
                      <button className={`${styles.btn} ${styles.editBtn}`}>
                        ویرایش
                      </button>
                    </Link>
                  </div>
                ) : (
                  <button onClick={() => detailsBtnHandler(contact.id)}>
                    ...
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Contacts;
