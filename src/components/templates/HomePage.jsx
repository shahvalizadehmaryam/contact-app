import { useContext, useEffect, useState } from "react";
import Contacts from "../modules/Contacts";
import Search from "../modules/Search";
import { ContactContext } from "../../context/ContactProvider";
import axios from "axios";
import Loader from "../modules/Loader";
import { IoIosAddCircleOutline } from "react-icons/io";
import { deleteContact, getContactList } from "../../services/ContactsApi";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { RiCheckDoubleLine } from "react-icons/ri";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import Modal from "../modules/Modal";

const HomePage = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  const { isLoading } = contacts;
  const [showModal , setShowModal] = useState(false);
  const fetchContacts = async () => {
    try {
      setContacts({ type: "FETCH_START" });
      const { data } = await axios.get(getContactList());
      setContacts({ type: "FETCH_INITIAL_DATA", payload: data });
    } catch (error) {
      setContacts({ type: "FETCH_INITIAL_DATA", payload: [] });
      console.log(error.messages);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  const handleBtnGroupDelete = () => {
    setShowModal(true);
  };
console.log("istoggle",contacts.isGroupDeleteSelected)
  return (
    <div>
      <div className={styles.header}>
        <Search />
        <div className={styles.iconsPart}>
          <Link to="/new-contact">
            <IoIosAddCircleOutline className={styles.addIcon} />
          </Link>

          {contacts.isGroupDeleteSelected ? (
            <button onClick={handleBtnGroupDelete}><AiOutlineUsergroupDelete className={styles.deleteGroupIcon} /></button>
          ) : (
            <button
              onClick={() => setContacts({ type: "DELETE_IN_GROUP_TOGGLED" })}
            >
              <RiCheckDoubleLine className={styles.checkIcon} />
            </button>
          )}
        </div>
      </div>

      {isLoading ? <Loader /> : <Contacts />}
      {showModal && <Modal text="ایا مایل به حذف گروهی هستید؟" setShowModal={setShowModal} showModal={showModal} />}
      
    </div>
  );
};

export default HomePage;
