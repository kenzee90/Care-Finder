"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { NavbarComponent } from "@/components/navbarComponent";

// Dynamically import AddItem with no SSR
const AddItem = dynamic(() => import("@/components/addItem"), { ssr: false });

export default function Page(){
    const [isMounted, setIsMounted] = useState(false);
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (user === null && typeof window !== 'undefined') {
            router.push("/")
        }
    }, [user, router]);

    if (!isMounted) {
        return null; // or a loading spinner
    }

    return(
        <main className="flex min-h-screen flex-col gap-2 px-3 dark:bg-gray-800 md:px-10">
            <NavbarComponent />
            <div className="mt-3 w-full rounded-lg border px-3 py-4 shadow-sm shadow-emerald-100">
                <h1 className="text-2xl md:text-6xl">
                    Welcome to care finder!
                </h1>
            </div>
            <div className="flex flex-col items-center justify-between gap-2">
                <h1 className="border-b-2 mb-4 py-2 text-2xl md:text-4xl">Add New Care Provider</h1>
                {isMounted && <AddItem />}
            </div>
        </main>
    )
}