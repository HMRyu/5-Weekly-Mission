import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SocialLogin() {
  const params = usePathname();

  return (
    <div className="w-full flex justify-between items-center mt-8 px-6 py-3 border border-[#CCD5E3] rounded-md">
      {params === "/signup" ? (
        <div>다른 방식으로 가입하기</div>
      ) : (
        <div>소셜 로그인</div>
      )}
      <div className="flex gap-6">
        <Link href="https://www.google.com">
          <div className="bg-[white] rounded-full cursor-pointer">
            <img
              className="p-[10px] w-[42px] h-[42px]"
              src="/images/google.png"
              alt="google"
            />
          </div>
        </Link>
        <Link href="https://www.kakaocorp.com/page">
          <div className="bg-[#F5E14B] rounded-full cursor-pointer">
            <img
              className="p-[10px] w-[42px] h-[42px]"
              src="/images/kakao.svg"
              alt="kakao"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
