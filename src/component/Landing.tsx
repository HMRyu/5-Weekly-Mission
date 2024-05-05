import { useEffect, useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import LandingDescription from "./LandingDescription";
import Navbar from "./Navbar";
import { getSampleUser } from "../api/api";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

function Landing() {
  const [user, setUser] = useState<UserData | null>(null);

  const getUserData = async () => {
    const result = await getSampleUser();

    return result;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await getUserData();

      setUser(data);
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <Hero />
      <LandingDescription />
      <Footer />
    </>
  );
}

export default Landing;
