Here's a markdown documentation for the Care-Finder project:

# Care-Finder Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Key Components](#key-components)
4. [Authentication](#authentication)
5. [Database](#database)
6. [Styling](#styling)
7. [Deployment](#deployment)

## Introduction

Care-Finder is a Next.js application designed to help users find and manage healthcare providers. It utilizes React for the frontend, Firebase for authentication and database management, and Flowbite for UI components.

## Project Structure

The project follows a typical Next.js structure with additional directories for components, utilities, and Firebase configuration:

- `app/`: Contains the main application pages and layouts
- `components/`: Reusable React components
- `context/`: React context for global state management
- `firebase/`: Firebase configuration and authentication utilities
- `utils/`: Utility functions and services
- `public/`: Static assets

## Key Components

### NavbarComponent


```1:46:components/navbarComponent.tsx
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
        
        <NavbarLink href="">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
```


The NavbarComponent provides navigation and user authentication status.

### HeroComponent


```1:36:components/hero.tsx
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
```


The HeroComponent displays the main landing page content.

### ListHospitals


```1:96:components/listHospitals.tsx
"use client";
import React, { useState, useEffect } from "react";
import { getHospitals } from "@/utils/service";
import { TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { RiHospitalLine } from "react-icons/ri";
import { Pagination } from "flowbite-react";

interface Hospital {
  id:string;
  name: string;
  description: string;
  state: string;
}
function ListHospitals() {
  const [hospitals, setHospitals] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState("");
  const [stateOptions, setStateOptions] = useState<any>([]);

  useEffect(() => {
   const fetchHospitals = async () => {
    const {hospitals, nextPage}= await getHospitals({ page, pageSize, searchTerm, state });
    setHospitals(hospitals);
    setTotalPages(nextPage ? nextPage : 1);
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
  const onPageChange = (page: number) => setPage(page);

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
          <li key={hospital.id} className="border-2 p-3 rounded-lg flex flex-col gap-3 justify-between">
            <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">{hospital.name}</h3>
                <RiHospitalLine className="text-2xl" />
             </div>
            
             <p className="text-lg font-gray-500">{hospital.state}</p>
           

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
```


ListHospitals component fetches and displays a list of hospitals with search and pagination functionality.

### AddItem


```1:69:components/addItem.tsx
"use client";
import { useState, useRef } from 'react';
import { Label, TextInput, Button } from "flowbite-react";
import { addHospital } from '@/utils/service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface AddItem {
    name: string;
    description: string;
    state: string;
  }
const AddItem = () => {
    const [value, setValue] = useState<AddItem>({
        name: '',
        description: '',
        state: '',
    });
    const modules = {
        toolbar: [
          [{ 'header': [1, 2,  false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          
        ]
    }
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      addHospital(value.name, value.description, value.state);
      setValue({ name: "", description: "", state: "" }); // Clear the form
    };
    const quillRef = useRef<ReactQuill>(null);
    return (
        // eslint-disable-next-line tailwindcss/classnames-order
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-[70vw] py-5'>
           
            <div className='w-full'>
                <div className="mb-2 block">
                <Label htmlFor="base" value="Hospital Name" />
                </div>
                <TextInput id="base" type="text" 
                 value={value.name}
                 onChange={(e) => setValue({ ...value, name: e.target.value })}
                sizing="md" 
                className='mb-2'/>
                <div className="mb-2 block">
                <Label htmlFor="base2" value="Description" />
                </div>
                <ReactQuill
                    theme='snow'
                    value={value.description}
                    onChange={(content) => setValue((prevValue) => ({ ...prevValue, description: content }))}
                    modules={modules}
                    ref={quillRef}
                />
                <div className="mb-2 block">
                    
                <Label htmlFor="base3" value="State" />
                </div>
                <TextInput id="base3" type="text" 
                 value={value.state}
                 onChange={(e) => setValue({ ...value, state: e.target.value })}
                sizing="md" 
                className='mb-2'/>
            </div>
            <Button type="submit" size="md">Add Item</Button>
        </form>
    );
};

```


AddItem component allows authenticated users to add new hospital entries.

## Authentication

Authentication is handled using Firebase Authentication. The project includes sign-up and sign-in functionality:

### Sign Up


```1:139:app/signUp/page.tsx
"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import Image from "next/image";
function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/dashboard");
  };
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 size-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
...
              </h1>
            </div>

            <form onSubmit={handleForm} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@mail.com"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account? &nbsp;
                  <a href="/signIn" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
export default Page;
```


### Sign In


```1:138:app/signIn/page.tsx
'use client'
import React from "react";
import signIn from "@/firebase/auth/signIn";
import { useRouter } from 'next/navigation'
import Image from "next/image";
function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/dashboard")
    }
    return (
        <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute inset-0 size-full object-cover opacity-80"
            />
  
            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
...
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                   Sign In
                  </button>
  
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                   New User? &nbsp;
                    <a href="/signUp" className="text-gray-700 underline">
                      Register Now
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
        </section>
    );
}
export default Page;
```


The AuthContext provides user authentication state across the application:


```1:51:context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, getAuth, User, signOut } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import NextTopLoader from 'nextjs-toploader';

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    const logout = async () => {
        await signOut(auth);
      };
    const value: AuthContextType = { user, loading, logout };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <NextTopLoader /> : children}
        </AuthContext.Provider>
    );
};
```


## Database

The project uses Firebase Firestore as its database. Hospital data is managed through the `service.ts` file:


```1:115:utils/service.ts
import db from "@/utils/firestore";
import {
  collection,
  addDoc,
  getDocs,
  limit,
  DocumentData,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
  Timestamp,
  startAfter,
} from "firebase/firestore";
import { toast } from "react-toastify";

export interface Item {
  name: string;
  description: string;
  state: string;
}

export const successMessage = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const errorMessage = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const addHospital = async (
  name: string,
  description: string,
  state: string,
) => {
  try {
    await addDoc(collection(db, "hospitals"), {
      name,
      description,
      state,
    });
    successMessage(`${name} Hospitals Added 🎉`);
  } catch (err) {
    errorMessage("Error! ❌");
    console.error(err);
  }
};
export async function getHospitals(
  { page = 1, pageSize = 12, searchTerm = "", state = "" }
) {
  try {
    const productsRef = collection(db, "hospitals");
    let q = query(productsRef);

    if (searchTerm) {
      q = query(
        q,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
      );
    }

    if (state) {
      q = query(q, where("state", "==", state));
    }

    q = query(q, orderBy("name"), limit(pageSize));

    if (page > 1) {
      const previousPageLastDoc = await getDocs(
        query(productsRef, orderBy("name"), limit(pageSize * (page - 1))),
      );
      const lastVisible =
        previousPageLastDoc.docs[previousPageLastDoc.docs.length - 1];
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const docs:any = [];
    // querySnapshot.forEach((d: any) => {
    //   docs.unshift({ ...d.data(), id: d.id });
    // });
    const hospitals = querySnapshot.docs.map((doc:any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return {
      hospitals,
      nextPage: querySnapshot.size === pageSize ? page + 1 : null,
    };
  } catch (error) {
    console.error("Error fetching Hospitals:", error);
    throw error;
  }
}
```


## Styling

The project uses Tailwind CSS for styling, with additional components from Flowbite React. The global styles are defined in:


```1:3:app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


## Deployment

The project is configured for deployment on Vercel, as indicated in the README:


```32:36:README.md
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
```


For more detailed information on deployment, refer to the Next.js deployment documentation.

---

This documentation provides an overview of the Care-Finder project structure and key components. For more detailed information on specific functions or components, refer to the inline comments and TypeScript types within each file.