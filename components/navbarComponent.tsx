"use client";
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { CareFinderLogo } from "./carefinnder-logo";
import { DarkThemeToggle } from "flowbite-react";
import  { useRouter } from "next/navigation";
import { redirect } from "next/navigation";



export function NavbarComponent() {
  const router = useRouter();
    
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
       <CareFinderLogo />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Care-Finder</span>
      </NavbarBrand>
      <div className="flex md:order-2">
      <DarkThemeToggle />

        <Button
        onClick={() => router.push("/signIn")}>
          Sign in /Register
        </Button>

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/hospital-list">Hospital List</NavbarLink>
        
        <NavbarLink href="">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
