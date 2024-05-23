import Link from "next/link";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource?: string;
  image_source?: string;
}

export default function Navbar({ user }: { user: UserData }) {
  return (
    <div className="flex justify-between items-center px-[32px] lg:px-[32px] xl:px-[200px] py-5 bg-[#F0F6FF]">
      <Link href="/">
        <img src="/images/logo.svg" alt="logo" />
      </Link>
      {user ? (
        <div className="flex">
          <img
            src={user.image_source}
            alt="profile"
            className="w-[28px] h-[28px] mr-2 rounded-full"
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
