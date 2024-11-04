import BackgroundImage from "./BackgroundImage"
import FloatingContainer from "./FloatingContainer"

interface PageContainerProps {
    children?: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
    return (
        <div className="flex-1 md:ml-64">
            <main className="pt-16 min-h-screen relative">
                <BackgroundImage />
                <FloatingContainer>
                    {children}
                </FloatingContainer>
            </main>
        </div>
    )
}