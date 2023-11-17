import { useEffect, useState } from "react";
import iconArrowL from "@app/assets/icons/right-arrow.png";
import imgDolar from "@app/assets/icons/imgdolar.png";
import imgPhone from "@app/assets/icons/imgphone.png";
import iconFB from "@app/assets/icons/iconFB.svg";
import iconWA from "@app/assets/icons/iconWA.svg";
import iconTWT from "@app/assets/icons/iconTWT.svg";
import iconTELE from "@app/assets/icons/iconTELE.svg";
import iconPR from "@app/assets/icons/iconFB.svg";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice, formatTimestamp, parseHTMLString } from "@app/utils/helper";
import { request } from "@app/utils/request";
import Layer from "@app/components/Maps/Layer";
import Maps from "../components/Maps";
import { Marker } from "react-leaflet";

const DetailWisata = () => {
  const { slug } = useParams();
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const [locationByUser, setLocationByUser] = useState(null);

  useEffect(() => {
    const getDetailWisata = () => {
      request
        .get(`/tourist-object/tourist-object/${slug}`)
        .then((response) => {
          // console.log(response);
          setDatas(response.data);
          setLocationByUser(response.data.location);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDetailWisata();
  }, []);

  return (
    <section className="m-auto md:max-w-[1250px] px-10 md:px-[100px]">
      <div className="pt-[104px]">
        <span className="p-3 rounded-full w-[71px] h-[71px] absolute flex justify-center items-center bg-white cursor-pointer" onClick={() => navigate(-1)}>
          <img src={iconArrowL} className="w-[24px] h-[24px]" />
        </span>
        <h1 className="text-[48px] font-[600] text-center pb-[32px]">{datas.name}</h1>
        <hr className="h-[4px] w-[78px] bg-[#FF7A00] m-auto" />
      </div>
      <main className=":px-[50px] pt-[70px]">
        <div style={{ backgroundImage: `url(${datas.image})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className="max-w-[940px] h-[400px] rounded-[20px]"></div>
        <div className="w-full flex gap-[30px] items-center pt-[47px] pb-[54px]">
          <img src={datas?.image} alt="avatar" className='w-[46px] h-[46px] rounded-full'/>
          <span className="flex-[1] w-fit relative">
            <h2 className="text-[24px] text-[#1F2F59] font-[600]">{datas?.name}</h2>
            <p className="text-[18px] font-[400] text-[#212529]">Diposting pada {formatTimestamp(datas?.created)}</p>
            <span className="text-[#F7911A] absolute top-0 right-0 bg-[#F7911A]/20 text-[12px] py-[10px] px-[20px] font-[600] rounded-[16px] uppercase">{datas?.category}</span>
          </span>
        </div>
        <div className="flex flex-wrap max-h-[400px] overflow-auto">
          <p className="text-[18px] font-[400] text-[#465170] overflow-hidden break-words">{parseHTMLString(datas?.description)?.body?.textContent}</p>
        </div>
        <section className="flex flex-col md:flex-row gap-[30px] pt-[46px] pb-[60px]">
          <div className="md:w-[455px] h-[108px] bg-[#FFFFFF] flex gap-[30px] justify-center items-center pl-[20px] rounded-[20px]">
            <img src={imgDolar} className="w-[48px] h-[48px] rounded-full" />
            <span className="flex-[1] w-fit relative">
              <p className="text-[16px] font-[400] text-[#212529]">Harga</p>
              <h2 className="text-[18px] text-[#1F2F59] font-[600]">{formatPrice(datas?.price)}</h2>
            </span>
          </div>
          <div className="md:w-[455px] h-[108px] bg-[#FFFFFF] flex gap-[30px] justify-center items-center pl-[20px] rounded-[20px]">
            <img src={imgPhone} className="w-[48px] h-[48px] rounded-full" />
            <span className="flex-[1] w-fit relative">
              <p className="text-[16px] font-[400] text-[#212529]">No Handphone</p>
              <h2 className="text-[18px] text-[#1F2F59] font-[600]">0891-2345-5553-2679</h2>
            </span>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-[600] text-[#465170]">Share wisata ini</h2>
          <span className="flex gap-[20px] pt-[18px] cursor-pointer">
            <img src={iconFB} className="rounded-full w-[40px] h-[40px]" />
            <img src={iconWA} className="rounded-full w-[40px] h-[40px]" />
            <img src={iconTELE} className="rounded-full w-[40px] h-[40px]" />
            <img src={iconPR} className="rounded-full w-[40px] h-[40px]" />
            <img src={iconTWT} className="rounded-full w-[40px] h-[40px]" />
          </span>
        </section>

        <section className="pt-[76px] pb-[100px]">
          <Maps>
            <Layer />
            {locationByUser && <Marker position={[locationByUser?.coordinates[1], locationByUser?.coordinates[0]]}></Marker>}
          </Maps>
        </section>
      </main>
    </section>
  );
};

export default DetailWisata;
