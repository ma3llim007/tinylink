import { useState } from "react";
import { toast } from "react-toastify";

const LinkForm = ({ loadData }) => {
    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (!url.startsWith("http")) {
            setError("URL must start with http:// or https://");
            return;
        }

        if (code.length > 1 && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
            setError("Code must be 6-8 characters long and alphanumeric only");
            return;
        }

        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/links`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetUrl: url, code }),
        });

        const json = await res.json();
        if (!res.ok) {
            setError(json.error || "Something went wrong");
        } else {
            setUrl("");
            setCode("");
            loadData();
        }
        setLoading(false);
        toast.success("New Link Added Successfully");
    };

    return (
        <form className="p-4 rounded space-y-3" onSubmit={submit}>
            <h2 className="font-bold text-lg">Create Short Link</h2>
            <div className="grid grid-cols-2 gap-2">
                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter long URL..." className="w-full p-2 border rounded" required />
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Custom code (optional)" className="w-full p-2 border rounded" />
                {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50" disabled={loading}>
                {loading ? "Creating..." : "Create"}
            </button>
        </form>
    );
};

export default LinkForm;
