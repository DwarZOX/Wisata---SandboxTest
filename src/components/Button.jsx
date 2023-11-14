import iconAdd from "@app/assets/icons/add.png";
import PropTypes from "prop-types";

const Button = ({ type = "button", style, classname, onClick, disabled }) => {
  let setStyle = "";
  if (style === "login") {
    setStyle = "h-[52px] text-[#FFFFFF] hover:bg-[#C67415] active:bg-[#C67415]";
  } else if (style === "tambah") {
    setStyle = "w-[158px] h-[52px] text-[#FFFFFF] hover:bg-[#C67415] active:bg-[#C67415]";
  } else if (style === "simpan") {
    setStyle = "w-[121px] h-[52px] text-[#FFFFFF] hover:bg-[#C67415] active:bg-[#C67415]";
  } else if (style === "batal") {
    setStyle = "w-[99px] h-[52px] text-[#F7911A] hover:bg-[#F7911A] active:bg-[#F7911A] hover:text-[#FFFFFF]";
  } else {
    setStyle = "w-[78px] h-[38px] text-[#FFFFFF] hover:bg-[#C67415] active:bg-[#C67415]";
  }
  return (
    <button
      type={type}
      className={`${classname} ${setStyle} flex items-center justify-center gap-[10px] font-[600] text-[16px] rounded-[26px] capitalize ${disabled ? "cursor-not-allowed bg-[#FBC88C] hover:bg-[#FBC88C] active:bg-[#FBC88C]" : "bg-[#F7911A] cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {style === "tambah" && <img src={iconAdd} className="w-[22px] h-[22px]" />}
      {style}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  style: PropTypes.string,
  classname: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Button;
