import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const Contacts = () => {
  const { contacts } = useContext(ContactContext);
  console.log(contacts);
  return (
    <>
      <table dir="rtl">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.updatedData?.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Contacts;
