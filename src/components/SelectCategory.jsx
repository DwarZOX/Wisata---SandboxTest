import useSWR from "swr";
import iconCategory from "@app/assets/icons/category.png";
import PropTypes from "prop-types";

const SelectCategory = ({value,onChange}) => {
	const { data: listCategory } = useSWR("/datamaster/tourist-object-category/");
	const handleSelect = (e) => onChange(e)
	
  return (
    <span className="w-[90vw] max-w-[400px] lg:w-[450px] h-[50px] rounded-[100px] flex justify-between items-center gap-[12px] bg-[#FFFFFF] px-4">
      <img src={iconCategory} className="w-[19px] h-[20px]" />
      <select
				name='category'
				id='category'
				className={`flex pl-10 items-center justify-center h-full w-full focus:border-0 focus:outline-0 pr-2 ${
					value ? '' : 'placeholder'
				}`}
				value={value}
				onChange={(e) => handleSelect(e.target.value)}>
				<option
					disabled
					>
					Pilih kategori
				</option>
				<option value="" selected>Semua Kategori</option>
				{listCategory?.data.map((category) => (
                <option key={category?.slug} value={category?.slug}>
                  {category?.label}
                </option>
              ))}
			</select>
			<button className={`${value ? 'visible' : 'invisible'} border-2 rounded-full px-1`} onClick={() => handleSelect('')}>&#10005;</button>
    </span>
  );
};

SelectCategory.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func
}

export default SelectCategory;
