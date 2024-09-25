import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactProvider";


const Search = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  console.log(contacts);
  const [text, setText] = useState("");
  useEffect(() => {
   setContacts({type:"FILTER_CONTACTS",payload:text});
  }, [text]);
  return (
    <>
      <label htmlFor="search">جستجو در مخاطبین</label>
      <input
        id="search"
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
};

export default Search;
