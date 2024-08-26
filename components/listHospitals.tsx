"use client";
import React, { useState, useEffect } from "react";
import { getHospitals } from "@/utils/service";
import { TextInput, Select } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { RiHospitalLine } from "react-icons/ri";
import { Pagination } from "flowbite-react";

interface Hospital {
  id: string;
  name: string;
  description: string;
  state: string;
}

function ListHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateOptions, setStateOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      const { hospitals, nextPage } = await getHospitals({ page, pageSize, searchTerm });
      setHospitals(hospitals);
      setTotalPages(nextPage ? nextPage : 1);
    };

    fetchHospitals();
  }, [page, pageSize, searchTerm]);

  useEffect(() => {
    const fetchStateOptions = async () => {
      const { hospitals } = await getHospitals({ page: 1, pageSize: 1000 });
      const uniqueStates = Array.from(new Set(hospitals.map((hospital: Hospital) => hospital.state)));
      setStateOptions(uniqueStates);
    };
    fetchStateOptions();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  

  const onPageChange = (page: number) => setPage(page);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2>List of Hospitals</h2>
      <div>
        <div className="border-bottom flex flex-col items-center justify-center py-4 md:py-6 ">
          <h1 className="text-center text-xl font-bold uppercase tracking-tight md:text-2xl">
            Search for your Preferred Provider
          </h1>

          <div className="flex w-[90vw] gap-2 md:w-[50vw]">
            <TextInput
              id="search"
              type="text"
              rightIcon={IoSearch}
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Providers"
              className="grow"
            />
            
          </div>
        </div>
      </div>
      <ul className="mb-4 grid w-full grid-cols-2 gap-3 border p-4 shadow-md md:grid-cols-3 lg:grid-cols-4">
        {hospitals.map((hospital: Hospital) => (
          <li key={hospital.id} className="flex flex-col justify-between gap-3 rounded-lg border-2 p-3">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight md:text-2xl">{hospital.name}</h3>
                <RiHospitalLine className="text-2xl" />
             </div>
            
             <p className="font-gray-500 text-lg">{hospital.state}</p>
          </li>
        ))}
      </ul>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} showIcons />
      </div>
    </div>
  );
}

export default ListHospitals;