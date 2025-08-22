import { useEffect, useState } from "react";

function PromoBanner() {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const promoKey = "promoShownAt";
    const today = new Date().toISOString().split("T")[0]; // e.g., '2025-05-02'

    const lastShownDate = localStorage.getItem(promoKey);

    if (lastShownDate !== today) {
      setShowPromo(true);
      localStorage.setItem(promoKey, today); // Save today's date
    }
  }, []);

  if (!showPromo) return null;

  return (
    <div className="bg-yellow-300 p-4 rounded-md shadow-md text-center">
      🎉 Special Promo: Get 20% off today!
    </div>
  );
}

export default PromoBanner;
