import { useEffect, useState } from "react";
import { getSampleFolder } from "../api/api";
import LinkCard from "./LinkCard";

interface Link {
  id: string;
  createdAt: Date;
  url: string;
  title: string;
  description: string;
  imageSource: string;
}

function LinkCardList() {
  const [links, setLinks] = useState<Link[]>([]);

  const getLinkData = async () => {
    const result = await getSampleFolder();

    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getLinkData();

      setLinks(data.folder.links);
    };

    fetchData();
  }, []);

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center mt-[40px] xl:px-[200px] w-full">
      {links.map((link) => {
        return <LinkCard key={link.id} link={link} />;
      })}
    </div>
  );
}

export default LinkCardList;
