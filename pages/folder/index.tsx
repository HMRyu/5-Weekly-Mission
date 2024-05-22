import AddLinkInput from "@/component/AddLinkInput";
import FolderMain from "@/component/FolderMain";
import Navbar from "@/component/Navbar";
import Searchbar from "@/component/Searchbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useState } from "react";

export default function Folder() {
  const [inputValue, setInputValue] = useState<string>("");

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
