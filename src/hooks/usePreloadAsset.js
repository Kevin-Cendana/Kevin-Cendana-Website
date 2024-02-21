import { useEffect } from 'react';

/**
 * Custom hook to preload assets like images, fonts, JS, and CSS.
 * @param {string} assetUrl - The URL of the asset to preload.
 * @param {string} asType - The type of asset (e.g., 'image', 'font', 'script', 'style').
 */
export function usePreloadAsset(assetUrl, asType) {
  useEffect(() => {
    // Create a new link element for preloading
    const link = document.createElement('link');
    link.rel = 'preload'; // Set relation as preload
    link.href = assetUrl; // The URL of the asset to preload
    link.as = asType; // The type of content to preload (helps with prioritization)
    document.head.appendChild(link); // Add the link element to the head of the document

    // Cleanup function to remove the link tag when the component unmounts or the URL/type changes
    return () => {
      document.head.removeChild(link);
    };
  }, [assetUrl, asType]); // Dependencies array: only re-run this effect if assetUrl or asType changes
}
