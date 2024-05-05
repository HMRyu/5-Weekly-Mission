import { Link } from "react-router-dom";
import logoImg from "../images/logo.svg";
import profileImg from "../images/profile.svg";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

function Navbar({ user }: { user: UserData | null }) {
  return (
    <div className="flex justify-between items-center xl:px-[200px] lg:px-[32px] sm:px-[32px] py-5 bg-[#F0F6FF]">
      <Link to="/">
        <img src={logoImg} alt="logo" />
      </Link>
      {user ? (
        <div className="flex">
          <img
            src={profileImg}
            alt="profile"
            className="bg-[#6D6AFE] p-2 mr-2 rounded-full"
          />
          <div>{user.email}</div>
        </div>
      ) : (
        <button className="px-5 py-4 w-[128px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] rounded-md text-white text-sm font-bold">
          로그인
        </button>
      )}
    </div>
  );
}

export default Navbar;
