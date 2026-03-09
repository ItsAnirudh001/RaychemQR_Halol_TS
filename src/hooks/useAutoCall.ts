"use client"

import { useEffect } from 'react'

export default function useAutoCall(callback:() => Promise<void>) {
  useEffect(() => {
    window.addEventListener("beforeunload", callback);
    return () => {
      window.removeEventListener("beforeunload", callback);
    };
  }, []);
}
