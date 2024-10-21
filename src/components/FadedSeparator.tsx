export default function FadedSeparator() {
    return (
        <div className="container flex items-center my-4 mx-auto">
            <div
                className="flex-grow"
                style={{
                    background: "linear-gradient(to right, rgba(100, 100, 100, 0), rgba(100, 100, 100, 1), rgba(100, 100, 100, 1), rgba(100, 100, 100, 1), rgba(100, 100, 100, 0))",
                    height: '0.5px',
                }}
            ></div>
        </div>
    );
}