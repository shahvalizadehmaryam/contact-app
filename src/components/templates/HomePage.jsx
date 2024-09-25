import { useContext, useEffect } from "react";
import Contacts from "../modules/Contacts";
import Search from "../modules/Search";
import { ContactContext } from "../../context/ContactProvider";
import axios from "axios";

const HomePage = () => {
  const {contacts,setContacts } = useContext(ContactContext);
  const { isLoading } = contacts;
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setContacts({ type: "FETCH_START" });
        const { data } = await axios.get("http://localhost:8000/contacts");
        setContacts({ type: "FETCH_INITIAL_DATA",payload:data });
      } catch (error) {
        setContacts({ type: "FETCH_INITIAL_DATA",payload:[]});
        console.log(error.messages);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div>
      <Search />
      {isLoading && <p>Loading...</p>}
      <Contacts />
    </div>
  );
};

export default HomePage;
