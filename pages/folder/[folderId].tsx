import AddLinkInput from "@/component/AddLinkInput";
import FolderMain from "@/component/FolderMain";
import Navbar from "@/component/Navbar";
import Searchbar from "@/component/Searchbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();

  const { data: user } = useCurrentUser();

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
