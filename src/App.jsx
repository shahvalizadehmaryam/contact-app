import { Route, Routes } from "react-router-dom";
import Contacts from "./components/Contacts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Contacts />} />
        {/* <Route path="/bio" element={<Bio />} /> */}
      </Routes>
    </>
  );
}

export default App;
