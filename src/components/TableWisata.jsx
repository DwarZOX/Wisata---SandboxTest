import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { TfiPencil } from "react-icons/tfi";
import { HiOutlineTrash } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useStateContext } from "@app/context/StateContext";
import PropTypes from "prop-types";

const TableWisata = ({ searchByName,getSpecificData,datas }) => {
  const {setModalPopup} = useStateContext()
  const [orderedPage, setOrderedPage] = useState(5);
  const [currPage, setCurrPage] = useState(1);
  const totalPages = Math.ceil(datas.length / orderedPage);


  const orderedPageHandler = (e) => {
    setOrderedPage(parseInt(e.target.value));
    setCurrPage(1);
  };
  const filteredDatas = datas.filter((data) => {
    const isNameMatch = data.name.toLowerCase().includes(searchByName.toLowerCase());
    return isNameMatch
  });

  const slicedDatas = filteredDatas.slice((currPage - 1) * orderedPage, currPage * orderedPage);
  
  
  const handleDelete = (isSHow,data) => {
    setModalPopup(isSHow)
    getSpecificData(data)
    
  };
  return (
    <table className="w-full rounded-[20px] overflow-hidden shadow-lg border-box">
      <thead>
        <tr className="bg-gray-200">
          <th className="w-[30px]">No</th>
          <th className="py-4 w-[100px]">Nama</th>
          <th className="w-[100px]">Harga</th>
          <th className="w-[100px]">Kategori</th>
          <th className="w-[100px]">Aksi</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {slicedDatas.length > 0 ? (
          slicedDatas.map((data, idx) => (
          <tr key={data.slug} className="border-b-2">
            <td className="py-3">{(currPage - 1) * orderedPage + idx + 1}</td>
            <td>{data.name}</td>
            <td>{data.price}</td>
            <td className="capitalize">{data.category}</td>
            <td className="py-2 flex items-center gap-4 justify-center">
              <NavLink to={`/dashboard/detail/${data.slug}`} className="border-2 rounded p-2 cursor-pointer ">
                <BsInfoCircle />
              </NavLink>
              <NavLink to={`/dashboard/ubah-wisata/${data.slug}`} className="border-2 rounded p-2 cursor-pointer ">
                <TfiPencil />
              </NavLink>
              <span onClick={() => handleDelete(true,data)} className="border-2 rounded p-2 cursor-pointer">
                <HiOutlineTrash />
              </span>
            </td>
          </tr>
        ))
        ) : (
          <tr>
            <td colSpan="5" className="py-4 pt-6">Data tidak ditemukan</td>
          </tr>
        )
        }

        <tr>
          <td colSpan="4">
            <div className=" py-4 pl-10 flex justify-center items-center gap-4">
              <p>Tampilkan</p>
              <select name="page" id="page" className="bg-[#F7911A] w-[55px] h-[30px] text-white px-[5px] rounded-[10px]" value={orderedPage} onChange={orderedPageHandler}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <p>data per halaman</p>
            
          
          {totalPages > 1 && (
						<div className='flex'>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<button
										key={page}
										className={`mx-1 w-10 py-1 rounded-[10px] ${
											currPage === page
												? 'bg-[#F7911A] text-white'
												: 'bg-gray-200'
										}`}
										onClick={()=>setCurrPage(page)}>
										{page}
									</button>
								)
							)}
						</div>
					)}</div></td>
        </tr>
      </tbody>
    </table>
  );
};

TableWisata.propTypes = {
  searchByName: PropTypes.string,
  getSpecificData: PropTypes.func,
  datas: PropTypes.array,
  length: PropTypes.number
}

export default TableWisata;
