"use client";
import React, { useState, useEffect } from "react";
import { getHospitals } from "@/utils/service";
import { TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";


interface Hospital {
  id:string;
  name: string;
  description: string;
  state: string;
}
function ListHospitals() {
  const [hospitals, setHospitals] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState("");
  const [stateOptions, setStateOptions] = useState<any>([]);

  useEffect(() => {
   const fetchHospitals = async () => {
    const {hospitals}= await getHospitals({ page, pageSize, searchTerm, state });
    setHospitals(hospitals);
   }

   fetchHospitals();
  }, [page, pageSize, searchTerm, state]);

  useEffect(() => {
    const fetchStateOptions = async () => {
      const uniqueStates = new Set(hospitals.map((hospital:any) => hospital.state));
      const states = Array.from(uniqueStates);
      
      setStateOptions(states);
    }
    fetchStateOptions();
  }, []);

  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };
  const handleStateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setState(event.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2>List of Hospitals</h2>
      <div>
        <div className="border-bottom flex flex-col items-center justify-center py-4 md:py-6 ">
          <h1 className="text-center text-xl font-bold uppercase tracking-tight md:text-2xl">
            Search for your Preffered Provider
          </h1>

          <TextInput
            id="email4"
            type="text"
            rightIcon={IoSearch}
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Providers"
            className="w-[90vw] py-3 md:w-[50vw]"
          />
          
        </div>
      </div>
      <ul className="grid w-full grid-cols-2 border p-4 md:grid-cols-3 lg:grid-cols-4 gap-3 shadow-md mb-4">
        {hospitals.map((hospital: Hospital) => (
          <li key={hospital.id} className="border-2 p-3 rounded-lg">
            <p>{hospital.name}</p>

          </li>
        ))}
      </ul>
    </div>
  );
}
export default ListHospitals;