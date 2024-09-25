const BASE_URL = "http://localhost:8000";
const getContactList = () => `${BASE_URL}/contacts`;
const deleteContact = (id) => `${BASE_URL}/contacts/${id}`;
const editContact = (id) => `${BASE_URL}/contacts/${id}`;

export { getContactList, deleteContact, editContact };
