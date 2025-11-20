import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Header from "../components/Header";

const Stats = () => {
    const { code } = useParams();
    const [data, setData] = useState(null);

    const fetchStats = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/links/${code}/stats`);
        const json = await res.json();
        setData(json.data);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (!data) return <Loading />;
    console.log(data);

    return (
        <div className="min-h-screen bg-slate-800 text-white">
            <Header />
            <div className="max-w-2xl mx-auto p-4 bg-slate-900 rounded shadow mt-6">
                <h1 className="text-2xl font-bold mb-4">Stats for {code}</h1>
                <p>
                    <strong>Target URL:</strong> {data.targetUrl}
                </p>
                <p>
                    <strong>Total Clicks:</strong> {data.totalClicks}
                </p>
                <p>
                    <strong>Last Clicked:</strong> {data.lastClickedAt ? new Date(data.lastClickedAt).toLocaleString() : "—"}
                </p>
                <Link to={"/"}>
                    <button class="px-3 py-2 bg-gray-300 text-black mt-4 text-sm hover:bg-gray-100 rounded transition cursor-pointer">Back to Dashboard</button>
                </Link>
            </div>
        </div>
    );
};

export default Stats;
