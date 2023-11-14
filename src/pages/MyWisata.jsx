import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@app/components/Button";
import Search from "@app/components/Search";
import Popup from "@app/components/modals/Popup";
import { useStateContext } from "@app/context/StateContext";
import TableWisata from "@app/components/TableWisata";
import { request } from "@app/utils/request";
import toast from "react-hot-toast";

const MyWisata = () => {
  const [spesificData, setSpesificData] = useState([]);
  const [datas, setDatas] = useState([]);
  const { modalPopup, setModalPopup } = useStateContext();
  const [searchParams, setSearchParams] = useSearchParams();
  let searchByName = searchParams.get("name") ?? "";
  const navigate = useNavigate();
  
  const getDatas = () => {
    request
      .get(
        `/tourist-object/tourist-object/me/${searchByName !== "" ? `?search=${searchByName}` : ""}`
      )
      .then((response) => {
        setDatas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDatas();
  }, [searchParams]);

  const handleSearch = (value) => setSearchParams({ name: value ?? "" });

  useEffect(() => {

    if (searchByName === "") {
      const params = new URLSearchParams(window.location.search);
      params.delete("name");
      setSearchParams(params);
    }
  }, [searchByName]);

  const handleDelete = () => {
    request
      .delete(`/tourist-object/tourist-object/${spesificData.slug}/`)
      .then((response) => {
        // console.log(response);
        getDatas();
        setModalPopup(false);      
        toast.success("Berhasi menghapus!")
      })
      .catch((error) => {
        console.log(error);
        toast.error("Gagal hapus data!");
      });
  };

  return (
    <>
      <div className="pt-10 md:pt-0 flex-[3.3]">
        <div className="w-full flex gap-[30px] justify-end">
          <Search placeholder={"Cari wisata"} searchByName={searchByName} handleSearch={(value) => handleSearch(value)} />
          <Button style={"tambah"} onClick={() => navigate("/dashboard/tambah-wisata")} />
        </div>

        <div className="pt-[50px]">
          <TableWisata searchByName={searchByName} datas={datas} getSpecificData={setSpesificData} />
        </div>
      </div>
      {modalPopup && (
        <div className="fixed left-0 flex justify-center items-center top-0 bg-[#000000]/70 w-full h-screen m-auto">
          <Popup setModalPopup={setModalPopup} handleDelete={handleDelete} name={spesificData.name} />
        </div>
      )}
    </>
  );
};

export default MyWisata;
