import { useState } from "react";
import { useHistory } from "react-router";

const Post = (url, data) => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState('');

    const history = useHistory();

    
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
        .then( () => {
            console.log('added workout');
            setIsPending(false);
            setError(null);
            history.push('/');
        })
        .catch( err => {
            setError(err.message);
            setIsPending(false);
        });
    

    return { error, isPending };
};

export default Post;