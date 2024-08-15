import { TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";


export function SearchBar() {
    return(
        <div className="border-bottom flex flex-col items-center justify-center py-4 md:py-6 ">
            <h1 className="text-center text-xl font-bold uppercase tracking-tight md:text-2xl">Search for your Preffered Provider</h1>

            <TextInput id="email4" type="text" rightIcon={IoSearch} placeholder="Search Providers" className="w-[90vw] py-3 md:w-[50vw]"/>
            

        </div>
    );
}