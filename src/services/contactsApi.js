const BASE_URL = "http://localhost:8000";
const getContactList = () => `${BASE_URL}/contacts`;
const deleteContact = (id) => `${BASE_URL}/contacts/${id}`;
const editContact = (id) => `${BASE_URL}/contacts/${id}`;
const addContact = () => `${BASE_URL}/contacts/`;

export { getContactList, deleteContact, editContact, addContact };
