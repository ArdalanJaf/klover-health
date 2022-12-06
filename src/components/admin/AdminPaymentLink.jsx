import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { priceToNum } from "../../utils/priceToNum";

function AdminPaymentLink() {
  const token = useSelector((state) => state.admin.login.token);
  const [localPrice, setLocalPrice] = useState("");
  const [url, setUrl] = useState("");

  const genPaymentLink = async (payload) => {
    try {
      setUrl("");
      const results = await axios.post(
        API_URL + "/stripe/create-payment-link",
        payload,
        {
          headers: { token: token },
        }
      );
      setUrl(results.data.url);
      setLocalPrice("");
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = (payload) => {
    navigator.clipboard.writeText(payload);
  };

  return (
    <div>
      <h2 className="mb-2">Payment Link</h2>
      <p>
        Create a payment link with a custom amount that can be sent to a client.
        Enter the price you want to charge, press "Generate payment link" and a
        link will be generated. You will be notified by email when a client has
        successfully paid.
      </p>
      <div className="alert alert-info">
        Prices are always in pound sterling (£).
      </div>
      <div className="d-flex flex-column align-items-center">
        <input
          className="form-control text-center mb-3 mt-1"
          value={localPrice}
          onChange={(e) => setLocalPrice(e.target.value)}
          style={{ maxWidth: "120px" }}
          placeholder="Price..."
          type="number"
          onWheel={(e) => e.target.blur()}
        ></input>
        <button
          className="btn btn-primary text-center"
          onClick={() => genPaymentLink({ amount: priceToNum(localPrice) })}
          disabled={localPrice ? false : true}
        >
          Generate payment link
        </button>
        {url.length > 0 && (
          <div className="border p-4 rounded mt-3">
            <a href={url}>{url}</a>
            <button
              className="btn border ms-3"
              onClick={() => copyToClipboard(url)}
            >
              <i class="bi bi-clipboard "></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPaymentLink;
