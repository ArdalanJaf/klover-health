import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../API/API_URL";
import { setPrices } from "../../redux/publicSlice";
import { numToPrice } from "../../utils/numToPrice";
import { priceToNum } from "../../utils/priceToNum";

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
      assessment: localA !== "" ? priceToNum(localA) : assessment,
      preAssessment: localPA !== "" ? priceToNum(localPA) : preAssessment,
    });
  };

  useEffect(() => {
    getPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <h5 className="mb-0 fw-normal">£{numToPrice(assessment)}</h5>
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
                <h5 className="mb-0 fw-normal">£{numToPrice(preAssessment)}</h5>
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
