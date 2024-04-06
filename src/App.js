import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchFolderList, fetchUserData } from "./api";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Detail from "./Components/Detail";
import Loading from "./Components/Loading";
import Folder from "./Components/Folder";
import Shared from "./Components/Shared";

function App() {
  const [id, setId] = useState(1);
  const [user, setUser] = useState(null);
  const [folderList, setFolderList] = useState([]);

  const loadUserData = async () => {
    const result = await fetchUserData(id);

    return result;
  }

  const loadSortList = async () => {
    const result = await fetchFolderList(id);

    return result;
  }

  useEffect(() => {
    loadUserData()
    .then((r) => {
      const { id, name, email, image_source } = r.data[0];
      setId((p) => ({
        ...p,
        id: id,
      }))
      setUser((p) => ({
        ...p,
        name: name,
        email: email,
        image_source: image_source,
      }));
    })
    .catch((e) => console.error(e));

    loadSortList()
    .then((r) => {
      setFolderList(r.data);
    }).catch((e) => console.error(e));

  },[]);

  return (
    <>
        {user ? <Navbar user={user} /> : <Loading />}
        <Routes>
          <Route path="/" element={<Shared />} />
          <Route path="/shared" element={<Shared />} />
          <Route path="/folder" element={<Folder sortList={folderList} id={id}/>} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
