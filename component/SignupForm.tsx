import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignupData {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  const [isClosed, setIsClosed] = useState(true);
  const [inputType, setInputType] = useState<"text" | "password">("password");

  const handleCheckDuplicateEmail = (data: SignupData) => {
    axios
      .post("https://bootcamp-api.codeit.kr/api/check-email", {
        email: data.email,
      })
      .then((r) => {
        console.log(r);
      })
      .catch((error) => {
        console.error(error);
        setError("email", {
          message: "중복된 이메일입니다.",
        });
      });
  };

  const handleSubmitSignupData = (data: SignupData) => {
    axios
      .post("https://bootcamp-api.codeit.kr/api/sign-up", {
        email: data.email,
        password: data.password,
      })
      .then((r) => {
        router.push("/folder");
      })
      .catch((error) => {
        console.error(error);
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
        handleCheckDuplicateEmail(data);
        handleSubmitSignupData(data);
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
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
              message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요",
            },
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
      <div className="relative pt-[30px]">
        <label htmlFor="passwordCheck" className="block text-[14px]">
          비밀번호 확인
        </label>
        <input
          id="passwordCheck"
          {...register("passwordCheck", {
            required: "비밀번호를 입력해 주세요.",
            validate: {
              check: (val) => {
                if (getValues("password") !== val) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            },
          })}
          type={inputType}
          placeholder="비밀번호를 확인해 주세요."
          className="w-full mt-3 px-[15px] py-[18px] rounded-md"
        />
        <img
          className={`absolute right-3 ${
            errors.passwordCheck?.message ? "bottom-10" : "bottom-5"
          }`}
          src={isClosed ? "/images/eye-off.svg" : "/images/eye-one.svg"}
          alt="eye-off"
          onClick={handleToggleImage}
        />
        <p className="text-[14px] text-[#FF5B56]">
          {errors.passwordCheck?.message}
        </p>
      </div>
      <button
        type="submit"
        className="mt-[30px] w-full px-5 py-4 bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] rounded-md text-[#F5F5F5]"
      >
        회원가입
      </button>
    </form>
  );
}
