import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Contacts.module.css";

const Contacts = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const { contacts, setContacts } = useContext(ContactContext);
  const navigate = useNavigate();

  console.log(contacts);
  // const editHandler = (contact) => {
  //   setContacts({type:"EDIT_ITEM_Toggle",payload:contact});
  //   setIsEdited(true);
  //   navigate("/new-contact")
  // }
  const detailsBtnHandler = (id) => {
    setActiveRow(activeRow === id ? null : id);
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
          {contacts.updatedData?.map((contact) => (
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
                      onClick={() =>
                        setContacts({
                          type: "DELETE_ITEM",
                          payload: contact.id,
                        })
                      }
                    >
                      
                      حذف
                    </button>
                    <Link to={`/edit/${contact.id}`}>
                    <button className={`${styles.btn} ${styles.editBtn}`}>ویرایش</button>
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
