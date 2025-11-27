export default function Logo({ className = "", iconSize = "w-8 h-8", textSize = "text-xl" }) {
    return (
        <div className={`flex items-center gap-2.5 font-bold ${className}`}>
            <div className={`relative ${iconSize} flex items-center justify-center`}>
                <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-sm transform hover:scale-110 transition-transform duration-300"
                >
                    <defs>
                        <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--accent)" />
                        </linearGradient>
                    </defs>
                    {/* Abstract S / Link Shape */}
                    <path
                        d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20"
                        stroke="url(#logoGradient)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="opacity-90"
                    />
                    <path
                        d="M28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20"
                        stroke="var(--secondary)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="opacity-90"
                    />
                    <circle cx="20" cy="20" r="3" fill="var(--foreground)" className="opacity-80" />
                </svg>
            </div>
            <span className={`tracking-tight font-extrabold text-foreground ${textSize}`}>
                Shortlys
            </span>
        </div>
    );
}
