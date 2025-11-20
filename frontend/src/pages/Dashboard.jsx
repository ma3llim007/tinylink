import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loading";
import LinksTable from "../components/LinksTable";
import LinkForm from "../components/LinkForm";

const Dashboard = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLinks = async () => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/links`);
        const json = await response.json();
        setLinks(json?.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <div className="min-h-screen bg-slate-800 text-white">
            <Header />
            <main className="container mx-auto py-4">
                <LinkForm loadData={fetchLinks} />
                <hr />
                {loading ? <Loader /> : <LinksTable data={links} loadData={fetchLinks} />}
            </main>
        </div>
    );
};

export default Dashboard;
