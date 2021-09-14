import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) throw Error('Could not retrieve data')
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            });
    }, [url]);

    return { data, isPending, error };
}
 
export default useFetch;