import Button from "../Button";
import PropTypes from "prop-types";

const Popup = ({ handleDelete, setModalPopup, name }) => {
  const handleClick = (act) => {
    if (act === "cancel") {
      setModalPopup(false);
    } else if (act === "delete") {
      handleDelete();
    }
  };
  return (
    <div className="max-w-[500px] max-h-[250px] bg-[#FFFFFF] rounded-[14px]">
      <p className="bg-[#FF3366] overflow-hidden py-[40px] px-[20px] rounded-t-[14px] text-[#FFFFFF] ">Apakah anda yakin ingin menghapus {name} ?</p>
      <span className="flex pt-[30px] pb-[20px] pr-[20px] gap-[10px] justify-end">
        <Button style={"batal"} classname={"bg-[#FFFFFF] rounded-[6px] h-[40px] w-[77px] border-[1px]"} onClick={() => handleClick("cancel")} />
        <Button style={"hapus"} classname={"bg-[#FF3366] rounded-[6px] py-[26px] h-[40px] w-[86px] text-white"} onClick={() => handleClick("delete")} />
      </span>
    </div>
  );
};

Popup.propTypes = {
  handleDelete: PropTypes.func,
  setModalPopup: PropTypes.func,
  name: PropTypes.string,
}

export default Popup;
