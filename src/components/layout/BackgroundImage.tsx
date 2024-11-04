export default function BackgroundImage() {
    return (
        <div 
            className="fixed inset-0 z-0 pt-16"
            style={{
                backgroundImage: "url('/images/websiteBackgroundRandom.jpeg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="absolute inset-0 bg-black/20" />
        </div>
    )
}