import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { priceToNum } from "../../utils/priceToNum";
import { numToPrice } from "../../utils/numToPrice";
import { Orbit } from "@uiball/loaders";

function AdminPaymentLink() {
  const token = useSelector((state) => state.admin.login.token);
  const [localPrice, setLocalPrice] = useState("");
  const [linkPrice, setLinkPrice] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const genPaymentLink = async (payload) => {
    setIsLoading(true);
    setLinkPrice("");
    try {
      setUrl("");
      const results = await axios.post(
        API_URL + "/stripe/create-payment-link",
        payload,
        {
          headers: { token: token },
        }
      );
      setIsLoading(false);
      setLinkPrice(numToPrice(priceToNum(localPrice)));
      setUrl(results.data.url);
      setLocalPrice("");
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = (payload) => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div className="alert alert-warning">
        Remember: prices are always in pound sterling (£).
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
          className="btn btn-primary text-center shadow"
          onClick={() => genPaymentLink({ amount: priceToNum(localPrice) })}
          disabled={localPrice ? false : true}
        >
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Orbit size={20} color="#fff" />
            </div>
          ) : (
            "Generate Payment Link"
          )}
        </button>

        {url.length > 0 && (
          <>
            <div className="mt-3 mw-100">
              <p className="lead mb-0">
                Payment link for <span className="numFont">£{linkPrice}</span>:
              </p>
              <div className="border p-4 rounded position-relative">
                <a style={{ wordWrap: "break-word" }} href={url}>
                  {url}
                </a>
                <div
                  className={`position-absolute display-1 fw-bold text-primary pe-sm-5 ${
                    copied ? "fadeOut" : ""
                  }
                    `}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                >
                  COPIED
                </div>
                {/* Copy Notification */}

                {/* Copy Button */}
                <button
                  className="btn border ms-3 d-none d-sm-inline"
                  style={{ maxWidth: "fit-content" }}
                  id="copyBtn"
                  onClick={() => copyToClipboard(url)}
                >
                  <i className="bi bi-clipboard "></i>
                </button>
              </div>

              {/* Mobile Copy Button */}
              <button
                className="btn border d-block d-sm-none m-auto mt-2"
                style={{ maxWidth: "fit-content" }}
                id="copyBtn"
                onClick={() => copyToClipboard(url)}
              >
                <i className="bi bi-clipboard "></i>
              </button>
            </div>
          </>
        )}
      </div>
      <div style={{ width: "100%", height: "100px" }} />
    </div>
  );
}

export default AdminPaymentLink;
