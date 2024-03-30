import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import { fetchFolderData, fetchUserData } from "./api";
import Profile from "./Components/Profile";
import CardList from "./Components/CardList";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import Detail from "./Components/Detail";

function App() {
  const [user, setUser] = useState({
    id: null,
    name: null,
    email: null,
    profileImageSource: null,
  });
  const [folderData, setFolderData] = useState(null);

  const loadUserData = async () => {
    let result;

    try {
      result = await fetchUserData();
    } catch (error) {
      console.error(error);
      return;
    }

    const { id, name, email, profileImageSource } = result;

    setUser((p) => ({
        ...p,
        id: id,
        name: name,
        email: email,
        profileImageSource: profileImageSource,
    }));
  }

  const loadFolderData = async () => {
    let result;
  
    try {
      result = await fetchFolderData();
    } catch(error) {
      console.error(error);
      return;
    }

    const { folder }  = result;
    setFolderData((p) => ({
      ...p,
      folder,
    }));
  }

  useEffect(() => {
    loadUserData();
    loadFolderData();
  }, []);

  return (
    <>
        <Navbar user={user} />
        <Profile folderData={folderData} />
        <Routes>
          <Route path="/" element={<CardList folderData={folderData} />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
        <Footer />
    </>
  );
}

export default App;
