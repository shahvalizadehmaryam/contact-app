import { useContext, useEffect } from "react";
import Contacts from "../modules/Contacts";
import Search from "../modules/Search";
import { ContactContext } from "../../context/ContactProvider";
import axios from "axios";
import Loader from "../modules/Loader";
import { getContactList } from "../../services/contactsApi";

const HomePage = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  const { isLoading } = contacts;
  useEffect(() => {
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
    fetchContacts();
  }, []);
  console.log("contacts in home" , contacts)

  return (
    <div>
      <Search />
      {isLoading ? <Loader /> : <Contacts />}
    </div>
  );
};

export default HomePage;
