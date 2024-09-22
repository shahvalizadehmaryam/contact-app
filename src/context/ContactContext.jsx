import { createContext, useState } from "react";

export const ContactContext = createContext();
const ContactProvider = ({children}) => {
    const [contacts , setContacts] = useState([
        {id:1,name:"maryam"},
        {id:2,name:"zahra"},
        {id:3,name:"ali"},
    ])
    return ( 
        <ContactContext.Provider value={{contacts,setContacts}}>
            {children}
        </ContactContext.Provider>
     );
}
 
export default ContactProvider;