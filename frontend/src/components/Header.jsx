import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-slate-950 px-6 py-4 flex justify-between items-center shadow-md shadow-amber-950 select-none ">
            <Link to={"/"}>
                <h1 className="text-2xl font-bold text-white underline tracking-wide hover:text-amber-400 transition-colors duration-200">TinyLink</h1>
            </Link>
            <nav>
                <ul className="flex items-center gap-6">
                    <li>
                        <a target="_blank" href="https://github.com/ma3llim007/tinylink" className="text-base text-gray-200 hover:text-white transition-colors duration-75">
                            Github Code
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href={`${import.meta.env.VITE_BACKEND_URL}/api-docs`} className="text-base text-gray-200 hover:text-white transition-colors duration-75">
                            API Documentation
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
