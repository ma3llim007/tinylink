import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LinksTable = ({ data, loadData }) => {
    const deleteLink = async (code) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/links/${code}`, {
            method: "DELETE",
        });
        loadData();
        toast.error("Link Delete Successfully!");
    };

    const copyToClipboard = (shortCode) => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}/api/links/${shortCode}`);
        toast.info("Copy to clipboard!");
    };
    return (
        <div className="p-4">
            <h2 className="font-bold text-lg mb-3">All Links</h2>
            {data?.length === 0 ? (
                <div className="w-full p-6 text-center text-gray-300 bg-gray-900 rounded-md border border-gray-700">
                    <p className="text-lg font-semibold">No Links Available</p>
                    <p className="text-sm opacity-80">Create a new link to see it here.</p>
                </div>
            ) : (
                <table className="w-full text-center border">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-2 border">Short Code</th>
                            <th className="p-2 border">Short Url</th>
                            <th className="p-2 border">Clicks</th>
                            <th className="p-2 border">Last Clicked</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((link) => (
                            <tr key={link.shortCode} className="border">
                                <td className="p-2 border">
                                    <Link to={`/code/${link.shortCode}`} className="underline">
                                        {link.shortCode}
                                    </Link>
                                </td>
                                <td className="p-2 max-w-[234px] wrap-break-word border">{link.shortCode}</td>
                                <td className="p-2 border">{link.totalClicks}</td>
                                <td className="p-2 border">{link.lastClickedAt ? new Date(link.lastClickedAt).toLocaleString() : "—"}</td>
                                <td className="p-2 space-x-2 border">
                                    <button
                                        onClick={() => copyToClipboard(link.shortCode)}
                                        className="text-gray-700 bg-gray-200 box-border border border-gray-300 hover:bg-gray-300 hover:text-gray-900 shadow-sm font-medium leading-5 rounded-md text-sm px-2 py-1  focus:outline-none cursor-pointer"
                                    >
                                        Copy
                                    </button>
                                    <Link to={`/code/${link.shortCode}`} className="text-sm bg-green-500 text-white px-2 py-1 font-medium leading-5 rounded-md cursor-pointer">
                                        View Stats
                                    </Link>
                                    <button onClick={() => deleteLink(link.shortCode)} className="text-sm bg-red-500 text-white px-2 py-1 font-medium leading-5 rounded-md cursor-pointer">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LinksTable;
