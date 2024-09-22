import { Route, Routes } from "react-router-dom";
import ContactProvider from "./context/ContactContext";
import HomePage from "./components/templates/HomePage";

function App() {
  return (
    <>
    <ContactProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      </ContactProvider>
    </>
  );
}

export default App;
