import { Link, useLocation } from "react-router-dom";

const Aside = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col flex-[.7] gap-[20px]">
      <Link to="/dashboard/profil-saya" className={`text-[20px] font-[600] ${pathname === "/dashboard/profil-saya" && "text-[#F7911A]"}`}>
        Profil Saya
      </Link>
      <Link to="/dashboard/wisata-saya" className={`text-[20px] font-[600] ${pathname === "/dashboard/wisata-saya" || pathname === "/dashboard/tambah-wisata" || pathname === "/dashboard/ubah-wisata/" ? "text-[#F7911A]" : ""}`}>
        Wisata Saya
      </Link>
    </div>
  );
};

export default Aside;
