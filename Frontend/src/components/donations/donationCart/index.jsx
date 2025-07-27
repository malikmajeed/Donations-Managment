import React, { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "../../../config/api.config";

export default function DonationCart({ causeId }) {
  const [causes, setCauses] = useState([]);

  useEffect(() => {
  const fetchCause = async () => {
    try {
      const res = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.BY_ID(causeId), {
        headers: {
          Authorization: undefined, // Explicitly remove the header for this request
        },
      });
      console.log(`donation Cart has`, res.data);
      //Normalizing the response to arrray
      const result = res.data.cause;

      if(Array.isArray(result) && result.length > 0) {
        setCauses(...causes, result);
      } else {
        setCauses(...causes,[result]); /// storing the result object as an array
      }
      
      
    } catch (error) {
      console.error(error);
    }
  };

  if (causeId) {
    fetchCause();
  }
}, [causeId]);

  return (
    <>
      <h1>Donation Cart</h1>
      {causes &&
        //.map method only works on arrays and if causes is not an array, it will throw an error
        // so we can use the optional chaining operator to check if causes is an array before mapping over it

        causes.map((c, index) => (
          <div key={index}>
            <h2>{c.name}</h2>
            <p>{c.description}</p>
            <p>
              Amount:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(c.budgetRequired)}
            </p>
          </div>
        ))}
    </>
  );
}
