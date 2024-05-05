import Landing from "./component/Landing";
import { Routes, Route } from "react-router-dom";
import Shared from "./component/Shared";
import Folder from "./component/Folder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shared" element={<Shared />} />
        <Route path="/folder" element={<Folder />} />
      </Routes>
    </>
  );
}

export default App;
