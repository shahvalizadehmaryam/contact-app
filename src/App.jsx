import { Route, Routes } from "react-router-dom";
import ContactProvider from "./context/ContactProvider";
import HomePage from "./components/templates/HomePage";
import NewContact from "./components/modules/NewContact";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ContactProvider>
        <Toaster position="top-right" reverseOrder={false} />
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
