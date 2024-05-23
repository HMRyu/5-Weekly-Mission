import AddLinkInput from "@/component/AddLinkInput";
import FolderMain from "@/component/FolderMain";
import Navbar from "@/component/Navbar";
import Searchbar from "@/component/Searchbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchUser } from "@/lib/userFetcher";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/** TODO:
 * 1. access token 없는 경우 signin 페이지로 이동할 때 alert 두 번 뜨는 오류 수정
 */

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

export default function Folder() {
  const [user, setUser] = useState<UserData | undefined | null>();
  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/input", { inputValue });
      setInputValue(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setInputValue("");
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchUser();
        setUser(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!localStorage.getItem("accessToken")) {
    alert("로그인이 필요합니다.");
    router.push("/signin");
  }

  return (
    <>
      <Navbar user={user} />
      <AddLinkInput />
      <Searchbar
        onSubmit={handleSubmit}
        onChange={handleChange}
        onClose={handleClose}
        inputValue={inputValue}
      />
      <FolderMain user={user} inputValue={inputValue} />
    </>
  );
}
