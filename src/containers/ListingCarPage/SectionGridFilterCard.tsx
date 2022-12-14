import React, { FC, useEffect, useState } from "react";
import { CarDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import CarCard from "components/CarCard/CarCard";
import axios from "axios";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: CarDataType[];
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = [],
}) => {
  const [listingData, setListingData] = useState<CarDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    axios.get("http://localhost:8080/api/car").then((response) => {
      setListingData(response.data);
    });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const DEMO_DATA = listingData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading="Cars in Tokyo"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            233 cars
            <span className="mx-2">·</span>
            Aug 12 - 18
          </span>
        }
      />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DEMO_DATA.map((car: any) => (
          <CarCard key={car.carId} data={car} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination
          totalPosts={listingData.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
