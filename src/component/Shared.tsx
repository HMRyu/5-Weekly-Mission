import { useEffect, useState } from "react";
import LinkCardList from "./LinkCardList";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import User from "./User";
import { getSampleUser } from "../api/api";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

function Shared() {
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
      <User user={user} />
      <SearchBar />
      <LinkCardList />
    </>
  );
}

export default Shared;
