"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AddItem from "@/components/addItem";
import { NavbarComponent } from "@/components/navbarComponent";

export default function Page(){
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return(
        
        <main className="flex min-h-screen flex-col gap-2 px-3 dark:bg-gray-800 md:px-10">
            <NavbarComponent />
            <div className="mt-3 w-full rounded-lg border px-3 py-4 shadow-sm shadow-emerald-100">
                <h1 className="text-2xl md:text-6xl">
                    Welcome to care finder!
                </h1>
            </div>
            <div className="flex flex-col items-center justify-between gap-2">
                <h1 className="border-bottom-2 mb-4 py-2 text-2xl md:text-4xl">Add New Care Provider</h1>
                <AddItem />
            </div>
            
        </main>
        
        
    )
}