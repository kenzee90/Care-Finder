"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AddItem from "@/components/addItem";

export default function Page(){
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return(
        <main className="flex min-h-screen flex-col gap-2 px-3 dark:bg-gray-800 md:px-10">
            <div className="mt-3 w-full rounded-lg border px-3 py-4 shadow-sm shadow-emerald-100">
                <h1 className="text-2xl md:text-6xl">
                    Welcome to care finder!
                </h1>
            </div>
            <div className="flex justify-between items-center flex-col gap-2">
                <h1 className="text-2xl md:text-4xl mb-4 border-bottom-2 py-2">Add New Care Provider</h1>
                <AddItem />
            </div>
            
        </main>
        
        
    )
}