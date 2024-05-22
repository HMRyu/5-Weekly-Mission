import LinkCard from "./LinkCard";

interface Link {
  id: string;
  created_at: Date;
  url: string;
  title: string;
  description: string;
  image_source: string;
}

export default function LinkCardList({ links }: { links: Link[] }) {
  if (links?.length === 0) {
    return (
      <div className="flex justify-center items-center mt-[50px]">
        저장된 링크가 없습니다.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center mt-[40px] xl:px-[200px] w-full">
      {links?.map((link) => {
        return <LinkCard key={link.id} link={link} />;
      })}
    </div>
  );
}
