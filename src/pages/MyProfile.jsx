import { useEffect, useState } from "react";
import iconCam from "@app/assets/icons/iconCam.png";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import { useStateContext } from "@app/context/StateContext";
import { request } from "@app/utils/request";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const MyProfile = () => {
  const [photo, setPhoto] = useState("");
  const [image, setImage] = useState("");
  const { userProfile, setUserProfile } = useStateContext();

  const { register, setValue, handleSubmit } = useForm({ mode: "onChange" });

  const getDatas = () => {
    request.get("/user/user/me/")
    .then((response) => {
      const responseData = response.data.data;
      // console.log(responseData);
      setValue("full_name", responseData?.full_name);
      setValue("email", responseData?.email);
      setValue("address", responseData?.address);
      setValue("handphone", responseData?.handphone);
      setPhoto(responseData?.photo);
      setUserProfile(responseData);
    });
  };
  useEffect(() => {
    getDatas();
  }, []);

  const uploadImageHandler = (e) => {
    setImage(e.target.files[0]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdateProfile = async (values) => {
    const { email, full_name, handphone, address } = values;
    let data = new FormData();
    console.log(data);

    if (image) {
      data.append("photo", image);
    }
    data.append("email", email);
    data.append("full_name", full_name);
    data.append("handphone", handphone);
    data.append("address", address);

    await request
      .patch("/user/user/me/", data)
      .then((response) => {
        console.log(response);
        toast.success("Berhasil merubah profil");
        getDatas();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <form className="pt-[40px] md:pt-0 flex-[2]" onSubmit={handleSubmit(handleUpdateProfile)}>
      <div className="w-full md:flex gap-[30px] items-center">
        <div
          // style={{ backgroundImage: `url(${photo ? photo : image})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "contain" }}
          className="m-auto md:m-0 relative w-[136px] h-[138px] border-[5px] border-white rounded-full shadow-[0_4px_15px_#67676740]"
        >
            <img src={photo ? photo : image} alt="avatar" className='w-[136px] h-[129px] rounded-full'/>
            <label htmlFor="tambah" className="cursor-pointer">
            <img src={iconCam} alt="Profile Photo" className="absolute -bottom-4 right-2 w-[44px] h-[44px] rounded-full border-white border-[1px]" />
            <input id="tambah" type="file" className="hidden" onChange={uploadImageHandler} />
          </label>
        </div>
        <span className="flex-[1]">
          <h2 className="text-[34px] pt-5 md:pt-0 text-[#1F2F59] font-[600]">{userProfile?.full_name}</h2>
          <p className="text-[14px] pb-10 md:pb-0 font-[400] text-[#212529]">{userProfile?.address}</p>
        </span>
        <Button type="submit" style={"simpan"} classname={"float-right md:float-none"} />
      </div>

      <div className="w-full flex flex-col pt-[50px]">
        <Input type={"nama"} classname={"h-full"} register={{ ...register("full_name", { required: true }) }} />
        <Input type={"email"} classname={"h-full"} register={{ ...register("email", { required: true }) }} />
        <Input type={"alamat"} classname={"h-full"} register={{ ...register("address", { required: true }) }} />
        <Input type={"number"} classname={"h-full"} register={{ ...register("handphone", { required: true }) }} />
      </div>
    </form>
  );
};

export default MyProfile;
