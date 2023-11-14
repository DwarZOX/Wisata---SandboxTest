import { useEffect, useState } from "react";
import Search from "@app/components/Search";
import SelectCategory from "@app/components/SelectCategory";
import Card from "@app/components/Card";
import InfiniteScroll from "react-swr-infinite-scroll";
import useSWRInfinite from "swr/infinite";

const Home = () => {
  const [selectedValue, setSelectedValue] = useState('')

  const [touristsURL, setTouristsURL] = useState(
    `/tourist-object/tourist-object/?category=&search=`
  );

  const swr = useSWRInfinite((index) => `${touristsURL}&page=${index + 1}`, {
    revalidateFirstPage: false,
  });

  const handleSearch = (searchInput) => 
  setTouristsURL(
      `/tourist-object/tourist-object/?category=${
        selectedValue ?? ""
      }&search=${searchInput}`
    );

  useEffect(() => {
    if (selectedValue === 'semuakategori') {
      setTouristsURL(
        `/tourist-object/tourist-object/?category=&search=`
      );
    } else {
      setTouristsURL(
        `/tourist-object/tourist-object/?category=${selectedValue}`
      );
    }
  }, [selectedValue]);

  const reFactorDataFromInfinite = (datas) => {
    const results = datas?.reduce((a, b) => ({
      meta: b.meta,
      data: b.data.concat(a.data),
    }));
  
    return results;
  };

  return (
    <main className="m-auto max-w-[1250px]">
      <h1 className="text-[48px] font-[600] text-center pb-[32px] pt-[134px]">Wisata</h1>
      <hr className="h-[4px] w-[78px] bg-[#FF7A00] m-auto" />

      <p className="text-center text-[#091535] font-[400] text-[16px] pt-[23px] pb-[45px]">Temukan wisata yang menarik disini</p>
      <div className="flex flex-col items-center md:flex-row justify-center gap-[24px]">
        <Search placeholder={"Cari wisata"} handleSearch={(value) => handleSearch(value)} />
        <SelectCategory value={selectedValue} onChange={setSelectedValue} />
      </div>

      <section className="flex flex-wrap gap-[24px] justify-center pt-[70px] pb-[126px]">
        <InfiniteScroll
              swr={swr}
              loadingIndicator="Loading..."
              isReachingEnd={(swr) => {
                const isDatas = reFactorDataFromInfinite(swr.data);

                return isDatas?.data?.length === isDatas?.meta?.total;
              }}
            >
              {(response) => {
                if (response?.data?.length > 0) {
                  return response?.data?.map((wisata) => (
                    <Card key={wisata?.slug} {...wisata} data={wisata} />
                  ));
                }

                return <div>Wisata kosong atau tidak ditemukan.</div>;
              }}
            </InfiniteScroll>
      </section>
    </main>
  );
};

export default Home;
