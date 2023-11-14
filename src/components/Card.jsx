import { Link } from "react-router-dom";
import { formatPrice, parseHTMLString } from "@app/utils/helper";
import PropTypes from "prop-types";

const Card = ({ slug, image, category, price, description, name }) => {
  return (
    <Link to={`/detail/${slug}`}>
      <article className="w-[360px] h-[446px] flex flex-col p-[20px] gap-[23px] bg-[#FFFFFF] rounded-[20px] cursor-pointer border-2 border-white hover:border-gray-300 hover:scale-110 transition-all duration-500">
        <header>
          <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} className="w-[320px] h-[192px] rounded-[10px] m-auto"></div>
        </header>
        <section>
          <span className="flex justify-between">
            <h3 className="w-[107px] h-[33px] rounded-[17px] bg-[#F7911A33] text-[12px] font-[600] flex justify-center items-center text-[#F7911A] uppercase">{category}</h3>
            <p className="text-[16px] text-[#1F2F59] font-[500]">{formatPrice(price)}</p>
          </span>
          <h1 className="text-[20px] font-[600] text-[#1F2F59] py-[10px]">{name}</h1>
          <p className="text-[16px] font-[400] text-[#465170] truncate">{parseHTMLString(description).body.textContent}</p>
        </section>
      </article>
    </Link>
  );
};

Card.propTypes = {
  slug: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  name: PropTypes.string,
}

export default Card;
