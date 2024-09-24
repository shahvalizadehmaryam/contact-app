import { createContext, useReducer } from "react";
export const ContactContext = createContext();
const initialState = {
  isLoading: false,
  data: [
    { id: 1, name: "سینا", email: "sina.gh@email.com",job:"software engineer",phone:"09147859621" },
    { id: 2, name: "مریم", email: "maryam.gh@email.com",job:"ux designer",phone:"09147859627" },
    { id: 3, name: "علی", email: "ali.gh@email.com",job:"graphic designer",phone:"09147858781" },
  ],
  updatedData: [  // Initially copy all contacts into updatedData
    { id: 1, name: "سینا", email: "sina.gh@email.com", job: "software engineer", phone: "09147859621" },
    { id: 2, name: "مریم", email: "maryam.gh@email.com", job: "ux designer", phone: "09147859627" },
    { id: 3, name: "علی", email: "ali.gh@email.com", job: "graphic designer", phone: "09147858781" },
  ],
  editedItem:{},
  isError: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FILTER_CONTACTS": {
      const text = action.payload;
      if (!text)
        return {
          ...state,
          updatedData: state.data,
        };
      const updatedContacts = state.data.filter(
        (item) =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.email.toLowerCase().includes(text.toLowerCase())
      );
      return {
        ...state,
       
        updatedData: updatedContacts,
      };
    }
    case "DELETE_ITEM": {
      const contactId = action.payload;
      const updatedContacts = state.updatedData.filter(
        (item) => item.id !== contactId
      );
      return {
        ...state,
        updatedData: updatedContacts,
      };
    }
    case "EDIT_ITEM":{
        
        const contact = action.payload;
   
        const updatedContacts = state.updatedData.map((item) =>
            item.id === contact.id ?  {...item,...contact} : item
          );
          console.log("updatedContacts",updatedContacts)
          console.log("state",state)
        return {
          ...state,
         /*   editedItem: contact, */
           updatedData: [...updatedContacts] 
        };
    }
    case "EDIT_ITEM_Toggle":{
      const contact = action.payload;
      console.log("contact",contact)
      return {
        ...state,
        editedItem: contact,
      };
    }
    case "ADD_CONTACT": {
      const contact = action.payload.id;
      return{
        ...state,
        data: [...state.updatedData , contact],
        updatedData: [...state.updatedData , contact]
      }
    }
    default:
      return state;
  }
};

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useReducer(reducer, initialState);
  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
