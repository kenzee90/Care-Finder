import { Card } from "flowbite-react";
import Image from "next/image";

export function HeroComponent() {
  return (
    <Card className="w-full">
      <div className="grid grid-cols-1 items-center justify-center py-10 md:grid-cols-2">
        <div
          className='mr-2 h-[50vh] w-full rounded-lg 
            bg-[url("/hospital-ward.jpg")]          
        bg-cover bg-center bg-no-repeat
        before:content-[""]
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-r
            before:from-green-400
            before:to-blue-500
            before:opacity-75
            before:z-[-5] shadow-md'
        ></div>
        <div className="flex flex-col items-center p-2">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
              Care-Finder
            </span>
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 md:text-xl">
            A platform to help you find the right care provider for your loved
            ones
          </p>
        </div>
      </div>
    </Card>
  );
}
