import { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import iconUser from "@app/assets/icons/user-octagon.png";
import iconKey from "@app/assets/icons/key.png";
import iconClose from "@app/assets/icons/close-square.png";
import { useStateContext } from "@app/context/StateContext";
import { setToken } from "@app/utils/auth";
import { useForm } from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast"

const Login = () => {
  const { setModalLogin, setIsLogin } = useStateContext();
  const [message, setMessage] = useState("");

  const { watch, register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const password = watch("password");
  useEffect(() => {
    setMessage("");
  }, [password]);

  const handleLogin = (payload) => {
    // request
    //   .post("/auth/login/", payload)
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/auth/login/`, payload)
      .then((response) => {
        toast.success(`Login Berhasil`);
        setToken(response.data);
        setIsLogin(true);
        setModalLogin(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLogin(false);
        if (error.code === "ERR_NETWORK") {
          toast.error(`Mohon maaf, ada masalah pada jaringan!`);
        } else if (error.code === "ERR_BAD_REQUEST") {
          setMessage(error.response.data.detail + "*");
        }
      });
  };

  return (
    <form className="flex flex-col justify-center w-[626px] max-h-[618px] rounded-[20px] p-[50px] bg-[#FFFFFF] relative" onSubmit={handleSubmit(handleLogin)}>
      <h3 className="text-[16px] font-[600] text-[#212529] pb-[24px] m-auto">Login</h3>
      <span className="absolute top-[54px] right-[54px] cursor-pointer" onClick={() => setModalLogin(false)}>
        <img src={iconClose} className="w-[24px] h-[24px]" />
      </span>
      <Input type={"email"} placeholder={"Email"} icon={iconUser} register={{ ...register("email", { required: true }) }} />
      {message && <p className="text-red-500">{message}</p>}
      <Input type={"password"} placeholder={"Password"} icon={iconKey} register={{ ...register("password", { required: true }) }} />
      {message && <p className="text-red-500">{message}</p>}
      <Button type="submit" style={"login"} classname={"w-[254px] m-auto mt-[32px]"} />
    </form>
  );
};

export default Login;
