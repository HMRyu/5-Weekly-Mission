import { useEffect, useState } from "react";
import { getSampleFolder } from "../api/api";

interface UserData {
  id: number;
  name: string;
  email?: string;
  profileImageSource: string;
}

function User({ user }: { user: UserData | null }) {
  const [folder, setFolder] = useState<any | null>(null);

  const getFolderData = async () => {
    const result = await getSampleFolder();

    return result;
  };

  useEffect(() => {
    const fetchFolder = async () => {
      const res = await getFolderData();

      setFolder(res.data.folder);
    };

    fetchFolder();
  }, []);

  return (
    <div className="flex flex-col items-center pt-5 py-[60px] bg-[#F0F6FF]">
      <img
        src={user?.profileImageSource}
        alt="profile"
        width="50px"
        className="rounded-full"
      />
      <div>@{user?.name}</div>
      <div className="text-center text-[#000] text-[40px] font-bold">
        {folder?.name}
      </div>
    </div>
  );
}

export default User;
