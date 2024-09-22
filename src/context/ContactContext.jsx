import { createContext, useReducer } from "react";
export const ContactContext = createContext();
const initialState = {
    isLoading:false,
    data:[
        {id:1,name:"سینا",email:"sina.gh@email.com"},
        {id:2,name:"مریم",email:"maryam.gh@email.com"},
        {id:3,name:"علی",email:"ali.gh@email.com"},
    ],
    updatedData:[],
    isError:false,
}
const reducer = (state, action) => {
    switch (action.type) {
        case "FILTER_CONTACTS": {
            const text = action.payload;
            if(!text) return {
                ...state,
                updatedData : state.data
            };
            const updatedContacts = state.data.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase()) || item.email.toLowerCase().includes(text.toLowerCase())
              );
          return {
            ...state,
            updatedData : updatedContacts
          };
        }
        default:
          return state;
      }
}

const ContactProvider = ({children}) => {
    const [contacts, setContacts] = useReducer(reducer, initialState);
    return ( 
        <ContactContext.Provider value={{contacts,setContacts}}>
            {children}
        </ContactContext.Provider>
     );
}
 
export default ContactProvider;