import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { setPrices } from "../../redux/publicSlice";
import { numToPrice } from "../../utils/numToPrice";

function AdminPricing() {
  const token = useSelector((state) => state.admin.login.token);
  const { assessment, preAssessment } = useSelector(
    (state) => state.public.prices
  );
  const dispatch = useDispatch();
  const [localA, setLocalA] = useState("");
  const [localPA, setLocalPA] = useState("");

  const getPrices = async () => {
    try {
      const results = await axios.get(API_URL + "/admin/prices");
      dispatch(setPrices(results.data.prices));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePrices = async (payload) => {
    try {
      await axios.post(API_URL + "/admin/update_prices", payload, {
        headers: { token: token },
      });
      getPrices();
      setLocalA("");
      setLocalPA("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    // SQL query always changes both prices, if only one price is changed fetch current price for other.
    updatePrices({
      assessment: localA !== "" ? formatPriceInput(localA) : assessment,
      preAssessment: localPA !== "" ? formatPriceInput(localPA) : preAssessment,
    });
  };

  function formatPriceInput(input) {
    // turns user input into SQL friendly value. eg. 300.50 => 30050
    if (!input.toString().includes(".")) return input * 100;
    let noDot = input.toString().split("");
    let wDot = noDot.slice(noDot.indexOf("."), noDot.length);
    noDot = noDot.splice(0, noDot.indexOf("."));
    wDot.shift();
    wDot = wDot.splice(0, 2);
    for (let i = 0; i < 2; i++) if (!wDot[i]) wDot.push("0");
    return Number(noDot.join("") + wDot.join(""));
  }

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <div>
      <h2 className="mb-2">Pricing</h2>
      <p>
        To change prices enter the new price in one or both input boxes, then
        click "Update Prices".
      </p>
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
                  value={localA}
                  onChange={(e) => setLocalA(e.target.value)}
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
                  value={localPA}
                  onChange={(e) => setLocalPA(e.target.value)}
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

      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={() => handleSubmit()}
          disabled={!localA && !localPA ? true : false}
        >
          Update Prices
        </button>
      </div>
    </div>
  );
}

export default AdminPricing;
