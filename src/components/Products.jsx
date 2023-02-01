import React, { useEffect } from "react";
import { numToPrice } from "../utils/numToPrice";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct, setPrices } from "../redux/publicSlice";
import Booking from "./Booking";
import Popout from "./Popout";
import axios from "axios";
import { API_URL } from "../API/API_URL";

function Products() {
  const { productSelected, prices } = useSelector((state) => state.public);
  const dispatch = useDispatch();

  const getPrices = async () => {
    // console.log("getting prices.. ", URL + "/admin/prices");
    try {
      const results = await axios.get(API_URL + "/admin/prices");
      dispatch(setPrices(results.data.prices));
    } catch (error) {
      console.log("API down " + error);
    }
  };

  useEffect(() => {
    getPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">Bookings</h2>
      <div className="d-md-flex ">
        <div className="w-md-50 me-md-3 d-flex flex-column mb-5 mb-md-0 text-center">
          <h4>In-Person Assessment</h4>
          {prices.assessment && (
            <h5 className="text-muted numFont mb-2">
              £{numToPrice(prices.assessment)}
            </h5>
          )}
          <p className="flex-grow-1 mx-auto" style={{ maxWidth: "600px" }}>
            The assessment consists of an up to two hours assessment in person.
            From this assessment a comprehensive report will be written, with
            NHS procedures in mind, to get you the care you need.
          </p>

          <div className="text-center py-2">
            <button
              className="btn btn-primary shadow"
              onClick={() => dispatch(selectProduct(1))}
            >
              Book In-Person Assessment
            </button>{" "}
          </div>
        </div>
        {/* {productSelected === 1 && (
          <Popout component={<Booking />} />
        )} */}
        <div className="w-md-50 ps-md-3 d-flex flex-column text-center">
          <h4>Remote Assessment</h4>
          {prices.preAssessment && (
            <h5 className="text-muted numFont mb-2">
              £{numToPrice(prices.preAssessment)}
            </h5>
          )}
          <p className="flex-grow-1 mx-auto" style={{ maxWidth: "600px" }}>
            The assessment consists of an up to two hours assessment over the
            phone or zoom. From this assessment a comprehensive report will be
            written, with NHS procedures in mind, to get you the care you need.
          </p>

          <div className="text-center py-2">
            <button
              className="btn btn-primary shadow "
              onClick={() => dispatch(selectProduct(2))}
            >
              Book Remote Assessment
            </button>
          </div>
        </div>
        {/* {productSelected === 2 && (
          <Popout component={<Booking />} />
        )} */}
      </div>
      {productSelected && <Popout component={<Booking />} />}
    </div>
  );
}

export default Products;
