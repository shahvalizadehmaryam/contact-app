import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactProvider";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewContact.module.css";
import { addContact, editContact } from "../../services/ContactsApi";
import axios from "axios";

const NewContact = () => {
const { contacts, setContacts } = useContext(ContactContext);
const { id } = useParams();
const contactId = id ? parseInt(id) : null; // If id exists, it's edit mode
const navigate = useNavigate();

// State to hold contact information (with default values for new contacts)
const [contact, setContact] = useState({
  name: "",
  email: "",
  job: "",
  phone: "",
});

// Populate the form if we are editing an existing contact
useEffect(() => {
  if (contactId) {
    const contactToEdit = contacts.data.find(
      (contact) => contact.id === contactId
    );
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

const handleEditContact = async () => {
  try {
    const response = await axios.put(editContact(contactId), contact);
    setContacts({ type: "EDIT_CONTACT", payload: response.data });
  } catch (error) {
    console.error("Error adding contact:", error);
  }

};
const handleAddContact = async () => {
  try {
    const response = await axios.post(addContact(), contact);
    setContacts({ type: "ADD_CONTACT", payload: response.data });
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

// Handle form submission for both adding and editing
const formSubmitHandler = async(e) => {
  e.preventDefault();

  if (contactId) {
    try {
      await handleEditContact();
    } catch (error) {
      console.log(error.messages);
    }
  } else {
    // If adding a new contact, append it to the contacts list
    try {
      await handleAddContact();
    } catch (error) {
      console.log(error.messages);
    }
  }

  // After submission, navigate back to the contact list
  navigate("/");
};

return (
  <div className={styles.container}>
    <form onSubmit={formSubmitHandler}>
      <div className={styles.formGroup}>
        <label htmlFor="name">نام و نام خانوادگی:</label>
        <input
          type="text"
          onChange={inputChangeHandler}
          name="name"
          value={contact.name}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>ایمیل:</label>
        <input
          type="email"
          onChange={inputChangeHandler}
          name="email"
          value={contact.email}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>شغل:</label>
        <input
          type="text"
          onChange={inputChangeHandler}
          name="job"
          value={contact.job}
        />
      </div>
      <div className={styles.formGroup}>
        <label>تلفن همراه:</label>
        <input
          type="text"
          onChange={inputChangeHandler}
          name="phone"
          value={contact.phone}
          required
        />
      </div>
      <button className={styles.btnEdit} type="submit">
        {contactId ? "ویرایش" : "افزودن"}
      </button>
    </form>
  </div>
);
};

export default NewContact;
