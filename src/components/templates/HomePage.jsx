import { useContext, useEffect } from "react";
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

const HomePage = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  const { isLoading } = contacts;
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
      console.log("selecteditems",contacts.selectedItems)
      axios.all(contacts.selectedItems.map((endpoint) => axios.delete(deleteContact(endpoint)))).then(
        (data) => console.log(data)
      );
      fetchContacts();
      // setContacts({type:"DELETE-ALL"})
     
  }

  return (
    <div>
      <div className={styles.header}>
        <Search />
        <div className={styles.iconsPart}>
          <Link to="/new-contact">
            <IoIosAddCircleOutline className={styles.addIcon} />
          </Link>
          <button onClick = {handleBtnGroupDelete}><RiCheckDoubleLine /></button>
          
        </div>
      </div>

      {isLoading ? <Loader /> : <Contacts />}
    </div>
  );
};

export default HomePage;
