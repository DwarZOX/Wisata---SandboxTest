import { useState } from "react";
import iconEye from "@app/assets/icons/eye.png";
import PropTypes from "prop-types";

const Input = ({ type, placeholder, classname, icon, register, value, onChange, onKeyDown, onFocus }) => {
  const [isShow, setIsShow] = useState(false);

  let setType = "";
  if (type === "nama" || type === "alamat" || type === "username") {
    setType = "text";
  } else if (type === "no handphone" || type === "harga") {
    setType = "number";
  } else if (type === "password lama" || type === "password baru" || type === "konfirmasi password baru") {
    setType = "password";
  } else {
    setType = type;
  }
  return (
    <>
      {type !== "search" && (
        <label htmlFor={type} className="capitalize text-[16px] pt-[32px] pb-[8px] font-[600]">
          {type === "number" ? "No Handphone" : type}
        </label>
      )}
      <span className={`flex items-center w-full h-[50px] px-4 gap-3 rounded-[10px] bg-white ${type !== "search" && "border-[1px]"}`}>
        {type === "username" || type === "password" ? <img src={icon} className="w-[24px] h-[24px]" /> : null}
        <input type={isShow ? "text" : setType} className={`${classname} w-full outline-none placeholder:capitalize`} placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} {...register} onKeyDown={onKeyDown} required />
        {type === "password" || setType === "password" ? <img src={iconEye} className="cursor-pointer" onClick={() => setIsShow(!isShow)} /> : null}
      </span>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  classname: PropTypes.string,
  icon: PropTypes.string,
  register: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
}

export default Input;
