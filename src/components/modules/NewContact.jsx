import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import { useNavigate, useParams } from "react-router-dom";

const NewContact = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  const { id } = useParams();
  const contactId = id ? parseInt(id) : null; // If id exists, it's edit mode
  const navigate = useNavigate();

  // State to hold contact information (with default values for new contacts)
  const [contact, setContact] = useState({
    id: Date.now(),
    name: "",
    email: "",
    job: "",
    phone: "",
  });

  // Populate the form if we are editing an existing contact
  useEffect(() => {
    if (contactId) {
      const contactToEdit = contacts.updatedData.find((contact) => contact.id === contactId);
      if (contactToEdit) {
        setContact(contactToEdit);
      }
    }
  }, [contactId, contacts]);

  // Handle input changes and update the contact state
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle form submission for both adding and editing
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("i am a contact",contact)
    if (contactId) {
      setContacts({type:"EDIT_CONTACT",payload:{contactId,contact}})
    } else {
      // If adding a new contact, append it to the contacts list
      setContacts({type:"ADD_CONTACT",payload:contact})
      console.log("contacts in form",contacts)
    }

    // After submission, navigate back to the contact list
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="name">:نام و نام خانوادگی:</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            name="name"
            value={contact.name}
            required
          />
        </div>
        <div>
          <label>:ایمیل</label>
          <input
            type="email"
            onChange={inputChangeHandler}
            name="email"
            value={contact.email}
            required
          />
        </div>
        <div>
          <label>شغل:</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            name="job"
            value={contact.job}
          />
        </div>
        <div>
          <label>تلفن همراه:</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            name="phone"
            value={contact.phone}
            required
          />
        </div>
        <button type="submit">
          {contactId ? "ویرایش" : "افزودن"}
        </button>
      </form>
    </div>
  );
};

export default NewContact;
