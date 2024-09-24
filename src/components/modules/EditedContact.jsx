import { useContext, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import { useNavigate } from "react-router-dom";

const EditedContact = () => {
    const { setContacts } = useContext(ContactContext);
    const [contact , setContact] = useState({
        id: Date.now(),
        name: "" ,
        email:"" ,
        job:"",
        phone:""
    });
    const navigate = useNavigate();
    const inputChangeHandler = (e) => {
        const {name , value} = e.target;
        setContact((prevContact) => ({...prevContact , [name]:value}))
    }
    const formSubmitHandler = (e) => {
      e.preventDefault();
      setContacts({type:"ADD_CONTACT",payload:contact})
      navigate('/');
    }
  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="name">:نام و نام خانوادگی:</label>
          <input type="text" onChange={inputChangeHandler} name="name" value={contact.name} />
        </div>
        <div>
          <label>:ایمیل</label>
          <input type="email" onChange={inputChangeHandler} name="email" value={contact.email} />
        </div>
        <div>
        <label>شغل:</label>
        <input type="text" onChange={inputChangeHandler} name="job" value={contact.job} />
        </div>
        <div>
        <label>تلفن همراه:</label>
        <input type="text" onChange={inputChangeHandler} name="phone" value={contact.phone} />
        </div>
        <button type="submit">افزودن</button>
      </form>
    </div>
  );
};

export default EditedContact;
