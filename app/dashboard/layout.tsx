// export const experimental_ppr = true;
export default function Layout({ children }: { children: React.ReactNode }) {   
    return (
        <main className="flex min-h-screen flex-col gap-2 px-3 dark:bg-gray-800 md:px-10 overflow-hidden">
            {children}
        </main>
    )
}