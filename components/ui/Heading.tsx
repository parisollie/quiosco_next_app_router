export default function Heading({ children }: { children: React.ReactNode }) {
    //Vid 684
    return (
        <h1 className="text-2xl my-10">
            {children}
        </h1>
    )
}
