import { useState } from "react";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import TextEditor from "@app/components/TextEditor";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { request } from "@app/utils/request";
import Layer from "@app/components/Maps/Layer";
import Pinning from "@app/components/Maps/Pinning";
import toast from "react-hot-toast";
import Maps from "@app/components/Maps";

const CreateWisata = () => {
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [locationByUser, setLocationByUser] = useState(null);

  const {
    watch,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const name = watch("name");
  const price = watch("price");
  const address = watch("address");

  const shouldShowImageError = !photo;
  const shouldShowNameError = !name;
  const shouldShowPriceError = !price;
  const shouldShowCategoryError = !category;
  const shouldShowDescriptionError = !description;
  const shouldShowAddressError = !address;
  const shouldShowLocationError = !locationByUser;

  const isFormValid = isValid && !shouldShowImageError && !shouldShowNameError && !shouldShowPriceError && !shouldShowCategoryError && !shouldShowDescriptionError && !shouldShowAddressError && !shouldShowLocationError && locationByUser;

  const uploadImageHandler = (e) => {
    setImage(e.target.files[0]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleCreate = (values) => {
    const { name, price, address } = values;

    let data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("image", image);
    data.append("address", address);
    data.append("category", category);
    data.append("description", description);
    data.append("location", JSON.stringify(locationByUser));

    request
      .post("/tourist-object/tourist-object/", data)
      .then(() => {
        toast.success("Berhasil buat wisata!");
        navigate("/dashboard/wisata-saya");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.response.status;
        if (errorCode === 400) {
          if (error.response.data.location == "Point harus berada dalam batas desa.") {
            toast.error(error.response.data.location);
          } else if (error.response.data.name == 'tourist object dengan name telah ada.') {
            toast.error(error.response.data.name[0]);
          } else {
            toast.error("Lokasi harus diisi!");
          }
        }
        // alert(error.response.data.detail);
      });
  };

  return (
    <section className="flex flex-col flex-[3] gap-[30px] m-auto pb-[104px]">
      <h1 className="text-[40px] font-[600] text-[#1F2F59]">Tambah Wisata</h1>
      <form className="flex flex-col pt-[30px]" onSubmit={handleSubmit(handleCreate)}>
        <label htmlFor="uploadImg" className="font-[600] pb-[10px]">
          Upload Gambar
        </label>
        <span className="rounded-lg border-[1px] p-[15px] pb-[25px] gap-5 flex flex-col bg-[#FFFFFF]">
          <input type="file" id="uploadImg" className="" onChange={uploadImageHandler} />
          {photo && <div style={{ backgroundImage: `url(${photo})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: "10px" }} className="h-[217px] p-2 w-full"></div>}
        </span>
        {shouldShowImageError && <p className="text-[#FBC88C]">Gambar harus diisi!</p>}
        <Input type={"nama"} classname={"h-full"} register={{ ...register("name", { required: true }) }} placeholder={"Masukkan nama wisata"} />
        {shouldShowNameError && <p className="text-[#FBC88C]">Nama wisata harus diisi!</p>}
        <Input type={"harga"} classname={"h-full"} register={{ ...register("price", { required: true }) }} placeholder={"Rp"} />
        {shouldShowPriceError && <p className="text-[#FBC88C]">Harga harus diisi!</p>}
        <label htmlFor="category" className="font-[600] pt-[40px] pb-[10px]">
          Kategori
        </label>
        <select
          name="category"
          id="category"
          className={`flex items-center justify-center h-[50px] full w-full border-[1px] focus:border-0 rounded-[10px] focus:outline-0 px-4 ${category ? "" : "placeholder"}`}
          // {...register("category", { required: true })}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled hidden>
            Pilih kategori
          </option>
          <option value="agrowisata">Agrowisata</option>
          <option value="bahari">Bahari</option>
        </select>
        {shouldShowCategoryError && <p className="text-[#FBC88C]">Kategori harus dipilih!</p>}
        <label htmlFor="description" className="pt-[40px] pb-[10px] font-[600]">
          Deskripsi
        </label>
        <div className="max-w-[1000px]">
          <TextEditor value={description} onChange={(value) => setDescription(value)} />
        </div>
        {shouldShowDescriptionError && <p className="text-[#FBC88C]">Deskripsi harus diisi!</p>}
        <Input type={"alamat"} classname={"h-full"} register={{ ...register("address", { required: true }) }} placeholder={"Masukkan alamat"} />
        {shouldShowAddressError && <p className="text-[#FBC88C]">Alamat harus diisi!</p>}
        <div className="pt-[50px]">
          <Maps>
            <Layer />
            <Pinning onChange={setLocationByUser} />
          </Maps>
        </div>
        {shouldShowLocationError && <p className="text-[#FBC88C]">Lokasi harus diisi!</p>}
        <span className="flex gap-[20px] pt-[40px] pb-[220px] justify-end">
          <Button style={"batal"} classname={"bg-[#FFFFFF] border-[1px]"} onClick={() => navigate(-1)} />
          <Button type={"submit"} style={"simpan"} disabled={!isFormValid} />
        </span>
      </form>
    </section>
  );
};

export default CreateWisata;
