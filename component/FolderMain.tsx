import { useEffect, useState } from "react";
import LinkCardListByFolderId from "./LinkCardListByFolderId";
import useSWR from "swr";
import axios from "axios";
import FolderButtons from "./FolderButtons";
import FolderTitlebar from "./FolderTitlebar";
import { useRouter } from "next/router";
import axiosInstance from "@/axios/axiosinstance";
import { fetchLinks } from "@/lib/linkFetcher";
import { fetchFolders } from "@/lib/folderFetcher";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

interface Folder {
  id: number;
  created_at: Date;
  name: string;
  user_id: number;
  favorite?: boolean;
}

interface Link {
  id: string;
  created_at: Date;
  url: string;
  title: string;
  description: string;
  image_source: string;
}

export default function FolderMain({
  user,
  inputValue,
}: {
  user: UserData | null;
  inputValue: string;
}) {
  if (!user) {
    return <div>Loading...</div>;
  }

  const router = useRouter();

  const [title, setTitle] = useState<string>("전체");
  const [clickedButton, setClickedButton] = useState<number | null>(0);
  const [folders, setFolders] = useState<Folder[] | undefined | null>();
  const [folderId, setFolderId] = useState<number>(0);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [modalStates, setModalStates] = useState<{
    addModal: boolean;
    shareModal: boolean;
    editModal: boolean;
    deleteModal: boolean;
    addLinkModal: boolean;
    deleteLinkModal: boolean;
  }>({
    addModal: false,
    shareModal: false,
    editModal: false,
    deleteModal: false,
    addLinkModal: false,
    deleteLinkModal: false,
  });
  const { data: links } = useSWR(
    () =>
      folderId === 0
        ? `https://bootcamp-api.codeit.kr/api/links`
        : `https://bootcamp-api.codeit.kr/api/links?folderId=${folderId}`,
    // fetcher
    (url) => axiosInstance.get(url).then((res) => res.data)
  );

  const openModal = (modal: keyof typeof modalStates) => {
    setModalStates({ ...modalStates, [modal]: true });
  };

  const closeModal = (modal: keyof typeof modalStates) => {
    setModalStates({ ...modalStates, [modal]: false });
  };

  const handleButtonClick = (folderId: number) => {
    setClickedButton(folderId);
    const clickedFolder = folders?.find(
      (folder: Folder) => folder.id === folderId
    );
    if (clickedFolder) {
      setFolderId(clickedFolder.id);
      setTitle(clickedFolder.name);
      router.push(`/folder/${folderId}`);
    }
  };

  const handleAllButtonClick = () => {
    setClickedButton(0);
    setFolderId(0);
    setTitle("전체");
    router.push("/folder");
  };

  const getInputValue = async () => {
    const response = await axios.post("/api/input", { inputValue });

    return response.data;
  };

  const handleFilter = async () => {
    if (links) {
      const i = await getInputValue();
      const nextLinks = links?.data?.folder?.filter(
        (link: any) =>
          (link.url && link.url.includes(i)) ||
          (link.title && link.title.includes(i)) ||
          (link.description && link.description.includes(i))
      );

      setFilteredLinks(nextLinks);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [inputValue]);

  useEffect(() => {
    const folderIdFromURL = parseInt(router.query.folderId as string, 10) || 0;
    setClickedButton(folderIdFromURL);
    setFolderId(folderIdFromURL);

    if (folderIdFromURL === 0) {
      setTitle("전체");
    } else {
      const clickedFolder = folders?.find(
        (folder: Folder) => folder.id === folderIdFromURL
      );
      setTitle(clickedFolder ? clickedFolder.name : "전체");
    }
  }, [router.query.folderId, folders]);

  useEffect(() => {
    const fetchFoldersData = async () => {
      try {
        const { data } = await fetchFolders();
        setFolders(data.folder);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoldersData();
  }, []);

  return (
    <>
      <FolderButtons
        clickedButton={clickedButton}
        handleButtonClick={handleButtonClick}
        handleAllButtonClick={handleAllButtonClick}
        folders={folders}
        openModal={openModal}
        closeModal={closeModal}
        modalStates={modalStates}
      />
      <FolderTitlebar
        title={title}
        openModal={openModal}
        closeModal={closeModal}
        modalStates={modalStates}
      />
      <LinkCardListByFolderId
        links={links?.data?.folder}
        filteredLinks={filteredLinks}
        inputValue={inputValue}
        modalStates={modalStates}
        setModalStates={setModalStates}
        openModal={openModal}
        closeModal={closeModal}
      />
    </>
  );
}
