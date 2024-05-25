import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource?: string;
  image_source?: string;
}

export default function Navbar({
  user,
}: {
  user: UserData | null | undefined;
}) {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsPopoverOpen(false);
    alert("로그아웃 되었습니다.");
    router.reload();
  };

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center px-[32px] lg:px-[32px] xl:px-[200px] py-5 bg-[#F0F6FF]">
      <Link href="/">
        <img src="/images/logo.svg" alt="logo" />
      </Link>
      {user ? (
        <div className="relative flex items-center">
          <img
            src={user.image_source || user.profileImageSource}
            alt="profile"
            className="w-[28px] h-[28px] mr-2 rounded-full cursor-pointer"
            onClick={togglePopover}
          />
          <div className="cursor-pointer" onClick={togglePopover}>
            {user.email}
          </div>
        </div>
      ) : (
        <Link href="/signin">
          <button className="px-5 py-4 w-[128px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] rounded-md text-white text-sm font-bold">
            로그인
          </button>
        </Link>
      )}
      {isPopoverOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg"
        >
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
