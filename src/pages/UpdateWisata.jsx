import { useEffect, useState } from "react";
import TextEditor from "@app/components/TextEditor";
import Button from "@app/components/Button";
import Input from "@app/components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "@app/utils/request";
import { useForm } from "react-hook-form";
import Layer from "@app/components/Maps/Layer";
import Maps from "@app/components/Maps";
import UpdatePin from "@app/components/Maps/UpdatePin";
import toast from "react-hot-toast";

const UpdateWisata = () => {
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const [locationByUser, setLocationByUser] = useState(null);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const location = {
    type: "Point",
    coordinates: [locationByUser?.coordinates[0], locationByUser?.coordinates[1]],
  };

  const name = watch("name");
  const price = watch("price");
  const address = watch("address");

  const shouldShowImageError = !photo
  const shouldShowNameError = !name
  const shouldShowPriceError = !price
  const shouldShowCategoryError = !category
  const shouldShowDescriptionError = !description
  const shouldShowAddressError = !address
  const shouldShowLocationError = !locationByUser

  // const isFormValid = isValid && !shouldShowImageError && !shouldShowNameError && !shouldShowPriceError &&
  //   !shouldShowCategoryError && !shouldShowDescriptionError && !shouldShowAddressError && !shouldShowLocationError && locationByUser;


  useEffect(() => {
    const getDetailWisata = () => {
      request
        .get(`/tourist-object/tourist-object/${slug}`)
        .then((response) => {
          // console.log(response)
          setPhoto(response.data.image);
          setValue("name", response.data.name);
          setValue("price", response.data.price);
          setValue("address", response.data.address);
          setCategory(response.data.category);
          setDescription(response.data.description);
          setLocationByUser(response.data.location);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDetailWisata();
  }, []);

  const uploadImageHandler = (e) => {
    setImage(e.target.files[0]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = (values) => {
    const { name, price, address } = values;
    let data = new FormData();
    if (image) {
      data.append("image", image);
    }
    data.append("name", name);
    data.append("price", price);
    data.append("address", address);
    data.append("category", category);
    data.append("description", description);
    data.append("location", JSON.stringify(location));

    request
      .patch(`/tourist-object/tourist-object/${slug}/`, data)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        toast.success("Berhasil update wisata");
        navigate("/dashboard/wisata-saya");
      })
      .catch((error) => {
        console.log(error);
        if ((error.code = "ERR_BAD_REQUEST")) {
          if (error.response.data.location) {
            toast.error(error.response.data.location[0]);
          }
        }
        console.log("errorr");
      });
  };

  return (
    <section className="flex flex-col flex-[3] gap-[30px] m-auto pb-[104px]">
      <h1 className="text-[40px] font-[600] text-[#1F2F59]">Ubah Wisata</h1>
      <form className="flex flex-col pt-[30px]" onSubmit={handleSubmit(handleUpdate)}>
        <label htmlFor="uploadImg" className="font-[600] pb-[10px]">
          Upload Gambar
        </label>
        <span className="rounded-lg border-[1px] p-[15px] pb-[25px] gap-5 flex flex-col bg-[#FFFFFF]">
          <input type="file" id="uploadImg" className="" onChange={uploadImageHandler} />
          {<div style={{ backgroundImage: `url(${photo ? photo : image})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: "10px" }} className="h-[217px] p-2 w-full"></div>}
        </span>
        {shouldShowImageError && <p className="text-red-500">Gambar harus diisi!</p>}
        <Input type={"nama"} classname={"h-full"} register={{ ...register("name", { required: true }) }} placeholder={"Masukkan nama wisata"} />
        {shouldShowNameError && <p className="text-red-500">Nama harus diisi!</p>}
        <Input type={"harga"} classname={"h-full"} register={{ ...register("price", { required: true }) }} placeholder={"Masukkan harga wisata"} />
        {shouldShowPriceError && <p className="text-red-500">Harga harus diisi!</p>}
        <label htmlFor="category" className="font-[600] pt-[40px] pb-[10px]">
          Kategori
        </label>
        <select
          name="category"
          id="category"
          className={`flex items-center justify-center h-[50px] full w-full border-[1px] focus:border-0 rounded-[10px] focus:outline-0 px-4 ${category ? "" : "placeholder"}`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled hidden>
            Cari Kategori
          </option>
          <option value="agrowisata">Agrowisata</option>
          <option value="bahari">Bahari</option>
        </select>
        {shouldShowCategoryError && <p className="text-red-500">Kategori harus diisi!</p>}
        <label htmlFor="description" className="pt-[40px] pb-[10px] font-[600]">
          Deskripsi
        </label>
        <div className="max-w-[1000px]">
          <TextEditor value={description} onChange={(value) => setDescription(value)} />
        </div>
        {shouldShowDescriptionError && <p className="text-red-500">Deskripsi harus diisi!</p>}
        <Input type={"alamat"} classname={"h-full"} register={{ ...register("address", { required: true }) }} placeholder={"Masukkan alamat"} />
        {shouldShowAddressError && <p className="text-red-500">Alamat harus diisi!</p>}
        <div className="pt-[50px]">
          <Maps>
            <Layer />
            <UpdatePin locationByUser={locationByUser} setLocationByUser={setLocationByUser} />
          </Maps>
        </div>
        {shouldShowLocationError && <p className="text-red-500">Lokasi harus diisi!</p>}
        <span className="flex gap-[20px] pt-[40px] pb-[220px] justify-end">
          <Button style={"batal"} classname={"bg-[#FFFFFF] border-[1px]"} onClick={() => navigate(-1)} />
          <Button type={"submit"} style={"simpan"}/>
        </span>
      </form>
    </section>
  );
};

export default UpdateWisata;
