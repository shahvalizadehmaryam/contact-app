import { Route, Routes } from "react-router-dom";
import ContactProvider from "./context/ContactProvider";
import HomePage from "./components/templates/HomePage";
import NewContact from "./components/modules/NewContact";

function App() {
  return (
    <>
    <ContactProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-contact" element={<NewContact />} />
 
        <Route path="/edit/:id" element={<NewContact />} />
      </Routes>
      </ContactProvider>
    </>
  );
}

export default App;
