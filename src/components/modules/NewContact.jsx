import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactProvider";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewContact.module.css";
import { addContact, editContact } from "../../services/ContactsApi";
import axios from "axios";
import toast from "react-hot-toast";

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

  const [formErrors, setFormErrors] = useState({
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

  // Basic validation function for email and phone
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  // Handle input changes and update the contact state
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));

    // Perform validation checks and update the error state
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Reset error message on change
    }));

    // Name validation
    if (name === "name") {
      if (value.trim().length < 3) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "نام باید بیش تر از 3 حرف باشد.",
        }));
      } else if (value.trim() === "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "نام  را وارد کنید",
        }));
      }
    }

    // Email validation
    if (name === "email") {
      if (!validateEmail(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "فرمت ایمیل معتبر نیست.",
        }));
      }
    }

    // Phone validation
    if (name === "phone") {
      if (!validatePhone(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          phone: "شماره تلفن باید 10 تا 15 رقم باشد.",
        }));
      }
    }
  };

  const handleEditContact = async () => {
    try {
      const response = await axios.put(editContact(contactId), contact);
      setContacts({ type: "EDIT_CONTACT", payload: response.data });
    } catch (error) {
      console.error("Error editing contact:", error);
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
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    // Perform final validation before submission
    if (Object.values(formErrors).some((error) => error !== "") || Object.values(contact).some((value) => value === "")) {
      toast.error("لطفا تمامی فیلدها را به درستی پر کنید.");
      return;
    }

    if (contactId) {
      try {
        await handleEditContact();
      } catch (error) {
        console.error(error);
      }
    } else {
      // If adding a new contact, append it to the contacts list
      try {
        await handleAddContact();
      } catch (error) {
        console.error(error);
      }
    }

    // After submission, navigate back to the contact list
    navigate("/");
    toast.success(contactId ? "مخاطب ویرایش شد." : "مخاطب جدید اضافه شد.");
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
          {formErrors.name && <p className="error">{formErrors.name}</p>}
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
          {formErrors.email && <p className="error">{formErrors.email}</p>}
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
          {formErrors.phone && <p className="error">{formErrors.phone}</p>}
        </div>
        <button className={styles.btnEdit} type="submit">
          {contactId ? "ویرایش" : "افزودن"}
        </button>
      </form>
    </div>
  );
};

export default NewContact;
