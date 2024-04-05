import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import { fetchFolderData, fetchUserData } from "./api";
import Profile from "./Components/Profile";
import CardList from "./Components/CardList";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import Detail from "./Components/Detail";
import Loading from "./Components/Loading";

function App() {
  const [user, setUser] = useState(null);
  const [folderData, setFolderData] = useState(null);

  const loadUserData = async () => {
    const result = await fetchUserData();

    return result;
  }

  const loadFolderData = async () => {
    const result = await fetchFolderData();
    
    return result;
  }

  useEffect(() => {
    loadUserData()
    .then((r) => {
      const { id, name, email, profileImageSource } = r; 

      setUser((p) => ({
        ...p,
        id: id,
        name: name,
        email: email,
        profileImageSource: profileImageSource,
      }));
    })
    .catch((e) => console.error(e));

    loadFolderData()
    .then((r) => {
      const { folder } = r;

      setFolderData((p) => ({
        ...p,
        folder,
      }));
    })
    .catch((e) => console.error(e));
  }, []);

  return (
    <>
        {user ? <Navbar user={user} /> : <Loading />}
        <Profile folderData={folderData} />
        <Routes>
          <Route path="/" element={folderData ? <CardList folderData={folderData} /> : <Loading />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
        <Footer />
    </>
  );
}

export default App;
