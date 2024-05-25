import SigninButton from "./SigninButton";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginData {
  email: string;
  password: string;
}

export default function SigninForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isClosed, setIsClosed] = useState(true);
  const [inputType, setInputType] = useState<"text" | "password">("password");

  const handleSubmitLoginData = (data: LoginData) => {
    axios
      .post("https://bootcamp-api.codeit.kr/api/sign-in", data)
      .then((r) => {
        localStorage.setItem("accessToken", r.data.data.accessToken);
        router.push("/folder");
      })
      .catch((error) => {
        setError("email", {
          message: "이메일을 확인해 주세요.",
        });
        setError("password", {
          message: "비밀번호를 확인해 주세요.",
        });
      });
  };

  const handleToggleImage = () => {
    setIsClosed((prevState) => !prevState);
    setInputType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) => {
        handleSubmitLoginData(data);
      })}
    >
      <div className="pt-[30px]">
        <label htmlFor="email" className="block text-[14px]">
          이메일
        </label>
        <input
          id="email"
          {...register("email", {
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "올바른 이메일 주소가 아닙니다.",
            },
          })}
          placeholder="이메일을 입력해 주세요."
          className="w-full mt-3 px-[15px] py-[18px] rounded-md"
        />
        <p className="text-[14px] text-[#FF5B56]">{errors.email?.message}</p>
      </div>
      <div className="relative pt-[30px]">
        <label htmlFor="password" className="block text-[14px]">
          비밀번호
        </label>
        <input
          id="password"
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
          })}
          type={inputType}
          placeholder="비밀번호를 입력해 주세요."
          className="w-full mt-3 px-[15px] py-[18px] rounded-md"
        />
        <img
          className={`absolute right-3 ${
            errors.password?.message ? "bottom-10" : "bottom-5"
          }`}
          src={isClosed ? "/images/eye-off.svg" : "/images/eye-one.svg"}
          alt="eye-off"
          onClick={handleToggleImage}
        />
        <p className="text-[14px] text-[#FF5B56]">{errors.password?.message}</p>
      </div>
      <SigninButton />
    </form>
  );
}
