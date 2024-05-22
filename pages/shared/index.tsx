import Footer from "@/component/Footer";
import LinkCardList from "@/component/LinkCardList";
import Navbar from "@/component/Navbar";
import SharedSearchBar from "@/component/SharedSearchBar";
import User from "@/component/User";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Shared() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <Navbar user={user} />
      <User user={user} />
      <SharedSearchBar />
      <LinkCardList />
      <Footer />
    </>
  );
}
