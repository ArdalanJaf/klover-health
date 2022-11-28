import React, { useEffect, useState } from "react";
import { numToPrice } from "../utils/numToPrice";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct, setPrices } from "../redux/publicSlice";
import Checkout from "./Checkout";
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
  }, []);

  return (
    <div id="products" className="pb-5">
      <div className="pb-3">
        <h3>Full Assessment</h3>
        <h4>£{numToPrice(prices.assessment)}</h4>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
          quaerat sint recusandae doloribus voluptate accusamus nostrum cum modi
          est magni? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Autem hic iusto quas minus doloremque nisi debitis quaerat eum
          aspernatur cupiditate.
        </p>

        <div className="text-center py-2">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(selectProduct(1))}
          >
            Book Full Assessment
          </button>{" "}
        </div>

        {productSelected === 1 && (
          <Popout component={<Checkout productId={1} />} />
        )}
      </div>
      <div>
        <h3>Initial Consultation</h3>
        <h4>£{numToPrice(prices.preAssessment)}</h4>
        <p>
          Not sure if this is right for you? No problem! Book a 30 minutes
          consultation call to find out. If you choose to go forward with an
          assessment the price of this consultation will be deducted from the
          total price.
        </p>

        <div className="text-center py-2">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(selectProduct(2))}
          >
            Book Initial Consultation
          </button>
        </div>

        {productSelected === 2 && (
          <Popout component={<Checkout productId={2} />} />
        )}
      </div>
    </div>
  );
}

export default Products;
