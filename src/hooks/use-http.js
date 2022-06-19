import {useCallback, useState} from 'react';
import {NODE_1_URL, NODE_2_URL} from "../constants/constants";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (returnDataHandler, requestConfig) => {
        const nodeURL = process.env.REACT_APP_PORT === '3000' ? NODE_1_URL : NODE_2_URL;
        setIsLoading(true);
        setError(null);
        try{
            const response = await fetch(nodeURL + requestConfig.path, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                headers: requestConfig.headers ? requestConfig.headers : {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error("Get Files request fail!")
            }
            const data = await response.json();
            returnDataHandler(data);
        }catch (e) {
            setError(e.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;