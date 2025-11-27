export default function Logo({ className = "", iconSize = "w-8 h-8", textSize = "text-xl" }) {
    return (
        <div className={`flex items-center gap-2.5 font-bold ${className}`}>
            <div className={`relative ${iconSize} flex items-center justify-center`}>
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full transform hover:rotate-12 transition-transform duration-500 ease-out"
                >
                    <defs>
                        <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--accent)" />
                        </linearGradient>
                    </defs>
                    {/* Modern Abstract Link/S Shape */}
                    <path
                        d="M10 22C6.68629 22 4 19.3137 4 16C4 12.6863 6.68629 10 10 10H14"
                        stroke="url(#logoGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M22 10C25.3137 10 28 12.6863 28 16C28 19.3137 25.3137 22 22 22H18"
                        stroke="var(--secondary)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 16H20"
                        stroke="var(--foreground)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8"
                    />
                </svg>
            </div>
            <span className={`tracking-tight font-extrabold text-foreground ${textSize}`}>
                Shortlys
            </span>
        </div>
    );
}
