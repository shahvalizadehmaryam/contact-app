import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactProvider";
import { Link } from "react-router-dom";
import styles from "./Contacts.module.css";
import axios from "axios";
import { deleteContact } from "../../services/ContactsApi";
import Modal from "./Modal";

const Contacts = () => {
  const [activeRow, setActiveRow] = useState(null);
  const { contacts, setContacts } = useContext(ContactContext);
  const [showModal , setShowModal] = useState(false);

  const text = "شما در حال حذف یکی از مخاطبینتان هستید ایا مطمعن هستید؟";
  const detailsBtnHandler = (id) => {
    setActiveRow(id);
  };
  const handleDelete =() => {
    
    setShowModal(true);
  };
  const handleCheckBoxChange = (id) => {
    if (contacts.selectedItems.includes(id)) {
      setContacts({ type: "DELETE_SELECTITEM", payload: id });
    } else {
      setContacts({ type: "ADD_SELECTITEM", payload: id });
    }
  };

  return (
    <>
    {showModal ? <Modal activeRow={activeRow} text={text} setShowModal={setShowModal} showModal={showModal} /> : (    <div className={styles.container}>
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
          {contacts.searchedData?.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.job}</td>
              <td>{contact.phone}</td>
              <td>
                {contacts.isGroupDeleteSelected > 0 ? (
                  <p>
                    <input
                      type="checkbox"
                      checked={contacts.selectedItems.includes(contact.id)}
                      onChange={() => handleCheckBoxChange(contact.id)}
                    />
                  </p>
                ) : (
                  <button onClick={() => detailsBtnHandler(contact.id)}>
                  ...
                </button>
                )}
                {activeRow === contact.id && (
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
                )}
              </td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>)}
    </>

  );
};

export default Contacts;
