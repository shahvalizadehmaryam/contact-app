import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactProvider";
import styles from "./Search.module.css"


const Search = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  console.log("c in search",contacts);
  const [text, setText] = useState("");
  useEffect(() => {
    /* if(!text) return; */
   setContacts({type:"FILTER_CONTACTS",payload:text});
  }, [text]);
  return (
    <div className={styles.container}>
      <label htmlFor="search">جستجو در مخاطبین:</label>
      <input
        id="search"
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default Search;
