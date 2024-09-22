import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";



const Contacts = () => {
    const {contacts} = useContext(ContactContext);
    console.log(contacts)
    return ( 
        <div>
            
            Contacts list

            </div>
     );
}
 
export default Contacts;