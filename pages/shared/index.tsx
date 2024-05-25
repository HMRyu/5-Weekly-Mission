import Footer from "@/component/Footer";
import LinkCardList from "@/component/LinkCardList";
import Navbar from "@/component/Navbar";
import SharedSearchBar from "@/component/SharedSearchBar";
import User from "@/component/User";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetcher } from "@/lib/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function Shared() {
  const { data: user } = useCurrentUser();

  const params = useParams();

  const { data: links } = useSWR(
    () =>
      !params.folderId
        ? `https://bootcamp-api.codeit.kr/api/users/${user?.id}/links`
        : `https://bootcamp-api.codeit.kr/api/users/${user?.id}/links?folderId=${params.folderId}`,
    fetcher
  );

  return (
    <>
      <Navbar user={user} />
      <User user={user} />
      <SharedSearchBar />
      <LinkCardList links={links?.data} />
      <Footer />
    </>
  );
}
