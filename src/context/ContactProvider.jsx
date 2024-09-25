import { createContext, useReducer } from "react";
export const ContactContext = createContext();
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
};
const reducer = (state, action) => {
  switch (action.type) {

    case "FETCH_START": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_INITIAL_DATA": {
      const contacts = action.payload;
      return {
        ...state,
        data: contacts,
        isLoading: false
      };
    }
    case "FILTER_CONTACTS": {
      const text = action.payload;
      if (!text)
        return {
          ...state,
          data: state.data,
        };
      const updatedContacts = state.data.filter(
        (item) =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.email.toLowerCase().includes(text.toLowerCase())
      );
      return {
        ...state,

        data: updatedContacts,
      };
    }
    case "DELETE_ITEM": {
      const contactId = action.payload;
      const updatedContacts = state.data.filter(
        (item) => item.id !== contactId
      );
      return {
        ...state,
        data: updatedContacts,
      };
    }
    case "EDIT_CONTACT": {
      const contactId = action.payload.contactId;
      const contact = action.payload.contact;
      const updatedData = state.data.map((c) =>
        c.id === contactId ? { ...contact } : c
      );
      console.log("updateddata in reducer", updatedData);
      return {
        ...state,
        data: updatedData,
      };
    }
    case "ADD_CONTACT": {
      const contact = action.payload;
      return {
        ...state,
        data: [...state.data, contact],
        // updatedData: [...state.updatedData, contact],
      };
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
