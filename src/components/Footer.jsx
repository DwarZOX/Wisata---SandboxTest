import logo from "@app/assets/logo-sandbox.png";

const Footer = () => {
  return (
    <footer className="bg-[#2B2C2B] h-[180px] flex flex-col gap-[30px] justify-center items-start px-10 md:px-[140px] text-center">
      <img src={logo} alt="Logo Sandbox" className="w-[160px] h-[51px]" />
      <hr className="w-full h-[1px]" />
    </footer>
  );
};

export default Footer;
