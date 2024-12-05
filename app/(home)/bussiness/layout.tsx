import Header from "@/components/header"

export default function BussinessLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
    <div>
        <Header/>
          
        {children}
        
    </div>
)
}