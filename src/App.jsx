// import { Route, Routes } from "react-router-dom";
import Contacts from "./components/Contacts";
import ContactProvider from "./context/ContactContext";

function App() {
  return (
    <>
    <ContactProvider>
      <Contacts />
      {/* <Routes>
        <Route path="/" element={<Contacts />} />
      </Routes> */}
      </ContactProvider>
    </>
  );
}

export default App;
