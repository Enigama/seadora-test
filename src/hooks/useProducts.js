import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL_PRODUCTS } from "../../contants/requestContstant";

export default (url = "") => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doReaquest = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    console.log(API_URL_PRODUCTS + url, options);
    axios
      .get(API_URL_PRODUCTS + url, options)
      .then(({ data }) => {
        setIsLoading(false);
        setResponse(data.data);
      })
      .catch((err) => {
        isLoading(false);
        setError(err.response.date);
      });
  }, [isLoading, options, url]);

  return [{ isLoading, response, error }, doReaquest];
};
