import { Toaster } from "sonner"

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Toaster/>
            {children}
        </div>
    )
}