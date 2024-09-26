import { createContext, useReducer } from "react";
export const ContactContext = createContext();
const initialState = {
  isLoading: false,
  data: [],
  searchedData: [],
  isError: false,
  selectedItems: [],
  isGroupDeleteSelected: false,
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
        searchedData: contacts,
        isLoading: false,
        isGroupDeleteSelected: false,
      };
    }
    case "FILTER_CONTACTS": {
      const searchTerm = action.payload.toLowerCase();
      if (!searchTerm) {
        return {
          ...state,
          searchedData: state.data,
        };
      }
      const filteredData = state.data.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        searchedData: filteredData,
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
        searchedData: updatedContacts,
      };
    }
    case "DELETE_SELECTITEM": {
      const contactId = action.payload;
      const updatedContacts = state.selectedItems.filter(
        (item) => item.id !== contactId
      );
      return {
        ...state,
        selectedItems: updatedContacts,
      };
    }
    case "DELETE_IN_GROUP_TOGGLED": {
      return {
        ...state,
        isGroupDeleteSelected: true,
      };
    }
    case "ADD_SELECTITEM": {
      const contactId = action.payload;
      return {
        ...state,
        selectedItems: [...state.selectedItems, contactId],
      };
    }
    case "DELETE_ALL": {
      return state;
    }
    case "EDIT_CONTACT": {
      const contact = action.payload;
      const updatedContacts = state.data.map((c) =>
        c.id === contact.id ? contact : c
      );
      return {
        ...state,
        data: updatedContacts,
        searchedData: updatedContacts,
      };
    }
    case "ADD_CONTACT": {
      const contact = action.payload;
      return {
        ...state,
        data: [...state.data, contact],
        searchedData: [...state.data, contact],
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
