async function safeFetch(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("API failed");
        return await res.json();
    } catch (err) {
        return { error: err.message };
    }
}

function formatPrice(n) {
    if (!n) return "–";
    return "$" + Number(n).toLocaleString();
}
