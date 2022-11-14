import React, { useEffect, useState } from "react";
import { numToPrice } from "../utils/numToPrice";
import { useSelector } from "react-redux";
import Booking from "./Booking";

function Products() {
  const { prices } = useSelector((state) => state.admin);
  const [product, setProduct] = useState("");

  return (
    <div id="products" className="pb-5">
      <div className="pb-3">
        <h3>Full Assessment</h3>
        <h5>£{numToPrice(prices.assessment)}</h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
          quaerat sint recusandae doloribus voluptate accusamus nostrum cum modi
          est magni?
        </p>
        {product !== 1 && (
          <div className="text-center py-2">
            <button className="btn btn-primary" onClick={() => setProduct(1)}>
              Book Full Assessment
            </button>
          </div>
        )}
        {product === 1 && <Booking productId={1} />}
      </div>
      <div>
        <h3>Initial Consultation</h3>
        <h5>£{numToPrice(prices.preAssessment)}</h5>
        <p>
          Not sure if this is right for you? No problem! Book a 30 minutes
          consultation call to find out. If you choose to go forward with an
          assessment the price of this consultation will be deducted from the
          total price.
        </p>
        {product !== 2 && (
          <div className="text-center py-2">
            <button className="btn btn-primary" onClick={() => setProduct(2)}>
              Book Initial Consultation
            </button>
          </div>
        )}
        {product === 2 && <Booking productId={2} />}
      </div>
    </div>
  );
}

export default Products;
