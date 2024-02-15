import { useState } from "react";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  return {
    isLoading,
    setIsLoading,
    loadingMessage,
    setLoadingMessage,
  };
};

export default useLoader;
