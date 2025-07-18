import { useRef, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ title = "List it. Do it.", options = [], onOptionClick = () => {} }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-gray-100 shadow mb-6">
            <div className="relative max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-center">
                    {title}
                </h1>

                <div className="relative ml-auto" ref={dropdownRef}>
                    <FaUserCircle
                        className="text-3xl cursor-pointer text-gray-600"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                    />
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-3 w-32 bg-white rounded shadow-md z-20">
                            {options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        onOptionClick(opt.value);
                                        setDropdownOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
