import { useEffect, useState } from "react";
import AddLinkInput from "./AddLinkInput";
import FolderMain from "./FolderMain";
import Navbar from "./Navbar";
import searchImg from "../images/search.svg";
import closeImg from "../images/close.svg";
import { getSampleUser, getUserLinks, getUserLinksById } from "../api/api";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

function Folder() {
  const [user, setUser] = useState<UserData | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [links, setLinks] = useState<any>([]);
  const [originalLinks, setOriginalLinks] = useState<any>([]);
  const [folderId, setFolderId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserData = async () => {
    const result = await getSampleUser();

    return result;
  };

  const getLinksById = (userId: number, folderId: number) => {
    const result = getUserLinksById(userId, folderId);

    return result;
  };

  const getAllLinks = (userId: number) => {
    const result = getUserLinks(userId);

    return result;
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);

    if (!e.target.value) {
      setLinks(originalLinks);
    }
  };

  const handleClose = async () => {
    setInputValue("");

    if (user !== null) {
      setLinks(originalLinks);
    }
  };

  const handleFilter = (inputValue: string) => {
    if (links) {
      const nextLinks = originalLinks.filter(
        (link: any) =>
          (link.url && link.url.includes(inputValue)) ||
          (link.title && link.title.includes(inputValue)) ||
          (link.description && link.description.includes(inputValue))
      );

      setLinks(nextLinks);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleFilter(inputValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData();
        const userData = response.data;
        setUser(userData);

        if (folderId === 0) {
          const allLinks = await getAllLinks(userData.id);
          setLinks(allLinks.data.data);
          setOriginalLinks(allLinks.data.data);
        } else {
          const folderLinks = await getLinksById(userData.id, folderId);
          setLinks(folderLinks.data.data);
          setOriginalLinks(folderLinks.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <AddLinkInput />
      <div className="relative xl:px-[200px] lg:px-8 md:px-8 sm:px-8">
        <form onSubmit={handleSubmit}>
          <img
            src={searchImg}
            alt="search"
            className="absolute top-[57px] xl:left-[210px] lg:left-[40px] sm:left-[40px] cursor-pointer"
            onClick={handleSubmit}
          />
          <input
            placeholder="링크를 검색해 보세요."
            className="w-full mt-[40px] px-4 py-4 rounded-md bg-[#F5F5F5] indent-[20px]"
            value={inputValue}
            onChange={handleChange}
          />
          <img
            src={closeImg}
            alt="close"
            className="absolute xl:right-[210px] lg:right-[50px] md:right-[50px] sm:right-[50px] top-[55px] cursor-pointer "
            onClick={handleClose}
          />
        </form>
      </div>
      <FolderMain
        user={user}
        inputValue={inputValue}
        links={links}
        setFolderId={setFolderId}
      />
    </>
  );
}

export default Folder;
