import { useEffect } from "preact/hooks";
const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": "prctbl_1N9KMkLu7M8tVKEHlyUhNaBo",
    "publishable-key":
      "pk_live_51MwAPaLu7M8tVKEHM1seZd4W6hvZua766au3WOv8A8lUNLHI9EMYKgp2NGqOPK6bSkGz8WeFEfItE2lazc5Bk22Y007uQ63ONi"
  });
};
export default StripePricingTable;
