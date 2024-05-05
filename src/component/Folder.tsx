import { useEffect, useState } from "react";
import AddLinkInput from "./AddLinkInput";
import FolderMain from "./FolderMain";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { getSampleUser } from "../api/api";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

function Folder() {
  const [user, setUser] = useState<UserData | null>(null);

  const getUserData = async () => {
    const result = await getSampleUser();

    return result;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await getUserData();

      setUser(data);
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <AddLinkInput />
      <SearchBar />
      <FolderMain user={user} />
    </>
  );
}

export default Folder;
