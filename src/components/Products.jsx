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
          <h4>Full Assessment</h4>
          <h5 className="text-muted numFont mb-2">
            £{numToPrice(prices.assessment)}
          </h5>
          <p className="flex-grow-1 mx-auto" style={{ maxWidth: "600px" }}>
            The assessment consists of an hour consultation in person or online,
            depending on what is most comfortable for you. From this assessment
            a comprehensive report will be written, with NHS procedures in mind,
            to get you the care you need.
          </p>

          <div className="text-center py-2">
            <button
              className="btn btn-primary shadow"
              onClick={() => dispatch(selectProduct(1))}
            >
              Book Full Assessment
            </button>{" "}
          </div>
        </div>
        {productSelected === 1 && (
          <Popout component={<Booking productId={1} />} />
        )}
        <div className="w-md-50 ps-md-3 d-flex flex-column text-center">
          <h4>Initial Consultation</h4>
          <h5 className="text-muted numFont mb-2">
            £{numToPrice(prices.preAssessment)}
          </h5>
          <p className="flex-grow-1 mx-auto" style={{ maxWidth: "600px" }}>
            Not sure a full assessment will help you? Book a 30 minutes
            consultation call to find out. If you choose to go forward with a
            full assessment the price of this consultation will be deducted from
            the total price.
          </p>

          <div className="text-center py-2">
            <button
              className="btn btn-primary shadow "
              onClick={() => dispatch(selectProduct(2))}
            >
              Book Initial Consultation
            </button>
          </div>
        </div>
        {productSelected === 2 && (
          <Popout component={<Booking productId={2} />} />
        )}
      </div>
    </div>
  );
}

export default Products;
