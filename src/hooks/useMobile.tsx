import { useState, useEffect } from "react";

export const useDeviceUser = () => {
    const [isMobile, setIsMobile] = useState(false); 
    const [isIphone, setIsIphone] = useState(false); 
    useEffect(() => {
        if ((/Android/i.test(navigator.userAgent))) {
            setIsMobile(true);
            setIsIphone(false);
        }
        if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
            setIsMobile(true);
            setIsIphone(true);
        }
        else {
            setIsMobile(false);
            setIsIphone(false);
        }
    }, [navigator.userAgent]);
    return [isMobile, isIphone];
  };