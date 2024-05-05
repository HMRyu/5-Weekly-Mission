import { useEffect, useState } from "react";
import LinkCardList from "./LinkCardList";
import Navbar from "./Navbar";
import User from "./User";
import searchImg from "../images/search.svg";
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
      <div className="relative xl:px-[200px] lg:px-8 md:px-8 sm:px-8">
        <form>
          <img
            src={searchImg}
            alt="search"
            className="absolute top-[57px] xl:left-[210px] lg:left-[40px] sm:left-[40px]"
          />
          <input
            placeholder="링크를 검색해 보세요."
            className="w-full mt-[40px] px-4 py-4 rounded-md bg-[#F5F5F5] indent-[20px]"
          />
        </form>
      </div>
      <LinkCardList />
    </>
  );
}

export default Shared;
