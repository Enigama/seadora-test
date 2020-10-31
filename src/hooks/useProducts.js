import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL_PRODUCTS } from "../../contants/requestContstant";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [options, setOptions] = useState({});

  const doReaquest = (url = "", options = {}) => {
    setOptions(options);
    setUrl(url);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    //console.log("request url", API_URL_PRODUCTS + url);
    axios
      .get(API_URL_PRODUCTS + url, options)
      .then(({ data }) => {
        setIsLoading(false);
        setResponse(data.data);
        if (data.data.items) {
          setItems([...items, ...data.data.items]);
        }
      })
      .catch((err) => {
        isLoading(false);
        setError(err.response.date);
      });
  }, [isLoading, options, url]);

  return [{ isLoading, response, items, error }, doReaquest];
};
