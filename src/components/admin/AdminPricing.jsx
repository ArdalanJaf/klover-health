import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { setPrices } from "../../redux/adminSlice";
import "react-datepicker/dist/react-datepicker.css";
import { numToPrice } from "../../utils/numToPrice";

function AdminPricing() {
  const token = useSelector((state) => state.admin.login.token);
  const { assessment, preAssessment } = useSelector(
    (state) => state.admin.prices
  );
  const [localPrices, setLocalPrices] = useState({
    assessment: "",
    preAssessment: "",
  });
  const dispatch = useDispatch();

  const getPrices = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/prices");
      dispatch(setPrices(results.data.prices));
    } catch (error) {
      console.log(error);
    }
  };

  function formatPriceInput(input) {
    if (!input.toString().includes(".")) return input * 100;
    let noDot = input.toString().split("");
    let wDot = noDot.slice(noDot.indexOf("."), noDot.length);
    noDot = noDot.splice(0, noDot.indexOf("."));
    wDot.shift();
    wDot = wDot.splice(0, 2);
    for (let i = 0; i < 2; i++) if (!wDot[i]) wDot.push("0");
    return Number(noDot.join("") + wDot.join(""));
  }

  const updatePrices = async (payload) => {
    // SQL query always changes both prices, if only one price is changed fetch current price for other.
    payload.preAssessment =
      payload.preAssessment !== ""
        ? formatPriceInput(payload.preAssessment)
        : preAssessment;
    payload.assessment =
      payload.assessment !== ""
        ? formatPriceInput(payload.assessment)
        : assessment;

    try {
      await axios.post(API_URL + "/admin/change_prices", payload, {
        headers: { token: token },
      });
      getPrices();
      setLocalPrices({
        a: "",
        pA: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2 className="mb-2">Pricing</h2>
      <p>
        To change prices enter the new price in one or both input boxes, then
        press "Update Prices".
      </p>
      {/* <div className="d-flex align-items-center justify-items-between"> */}
      <table className="table" id="priceTable">
        <tbody>
          <tr>
            <th scope="row">
              <div>
                <h5 className="mb-0" style={{ maxWidth: "fit-content" }}>
                  Assessment:
                </h5>
              </div>
            </th>
            <td>
              <div>
                <h5 className="mb-0">£{numToPrice(assessment)}</h5>
              </div>
            </td>
            <td>
              <div>
                <input
                  className="form-control text-center"
                  value={localPrices.a}
                  onChange={(e) =>
                    setLocalPrices({
                      ...localPrices,
                      a: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  style={{ maxWidth: "120px" }}
                  placeholder="New price..."
                />
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <div>
                <h5 className="mb-0" style={{ maxWidth: "fit-content" }}>
                  Pre-Assessment:
                </h5>
              </div>
            </th>
            <td>
              <div>
                <h5 className="mb-0">£{numToPrice(preAssessment)}</h5>
              </div>
            </td>
            <td>
              <div>
                <input
                  className="form-control text-center"
                  value={localPrices.pA}
                  onChange={(e) =>
                    setLocalPrices({
                      ...localPrices,
                      pA: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  style={{ maxWidth: "120px" }}
                  placeholder="New price..."
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* </div> */}

      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={() =>
            updatePrices({
              assessment: localPrices.a,
              preAssessment: localPrices.pA,
            })
          }
          disabled={!localPrices.a && !localPrices.pA ? true : false}
        >
          Update Prices
        </button>
      </div>
    </div>
  );
}

export default AdminPricing;
