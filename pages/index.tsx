import Footer from "@/component/Footer";
import Hero from "@/component/Hero";
import LandingDescription from "@/component/LandingDescription";
import LandingDescriptionMobile from "@/component/LandingDescriptionMobile";
import Navbar from "@/component/Navbar";
import { fetchUser } from "@/lib/userFetcher";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

export default function Home() {
  const [user, setUser] = useState<UserData | undefined | null>();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchUser();
        setUser(data[0]);
        console.log(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  if (!user) {
    <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <Hero />
      <LandingDescription />
      <LandingDescriptionMobile />
      <Footer />
    </>
  );
}
