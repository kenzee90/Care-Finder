"use client";
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { CareFinderLogo } from "./carefinnder-logo";
import { DarkThemeToggle } from "flowbite-react";
import  { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";



export function NavbarComponent() {
  const router = useRouter();
  const { user, logout} = useAuthContext()
    
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
       <CareFinderLogo />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Care-Finder</span>
      </NavbarBrand>
      <div className="flex md:order-2">
      <DarkThemeToggle />
          {
             user == null?
             <Button
             onClick={() => router.push("/signIn")}>
               Sign in /Register
             </Button>
          :
            <Button onClick={logout}>Logout</Button>
          }
       

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/hospital-list">Hospital List</NavbarLink>
        {user && <NavbarLink href="/dashboard">Add Care Provider</NavbarLink> }
        
      </NavbarCollapse>
    </Navbar>
  );
}
