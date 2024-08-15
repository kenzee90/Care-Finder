import AddItem from "@/components/addItem";
import FooterComponent from "@/components/footerComponent";

import { HeroComponent } from "@/components/hero";
import ListHospitals from "@/components/listHospitals";
import { NavbarComponent } from "@/components/navbarComponent";

import { SearchBar } from "@/components/searchBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-2 overflow-hidden px-3 dark:bg-gray-800 md:px-10" >
      <NavbarComponent />
      <HeroComponent />
      <ListHospitals />
      <FooterComponent />
    </main>
  );
}
