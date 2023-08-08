import React, { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import crypto from "crypto";
import axios from "axios";
import LiqPayResponse from "../../../components/liqpay";

const PaymentButton = ({ setIsPaid, totalAfterDiscount }) => {
  const [paymentParams, setPaymentParams] = useState({
    public_key: process.env.LIQPAY_PUBLIC_KEY,
    version: "3",
    amount: totalAfterDiscount,
    action: "pay",
    currency: "UAH",
    description: "Оплата за товари",
    language: "uk",
    order_id: "000002",
  });
  const [data, setData] = useState("");
  const [signature, setSignature] = useState("");
  const [html, setHtml] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const cnb_signature = (params) => {
    params = cnb_params(params);
    // setData(Buffer.from(JSON.stringify(params)).toString('base64'));
    return str_to_sign(
      params.private_key + data + process.env.LIQPAY_SECRET_KEY,
    );
  };
  useEffect(() => {
    setSignature(cnb_signature(paymentParams));
    setData(Buffer.from(JSON.stringify(paymentParams)).toString("base64"));
  }, [cnb_signature, paymentParams]);

  const cnb_params = (params) => {
    if (!params.version) {
      throw new Error("version is null");
    }
    if (!params.amount) {
      throw new Error("amount is null");
    }
    if (!params.currency) {
      throw new Error("currency is null");
    }
    if (!params.description) {
      throw new Error("description is null");
    }

    return params;
  };

  const str_to_sign = (str) => {
    const sha1 = crypto.createHash("sha1");
    sha1.update(str);
    return sha1.digest("base64");
  };

  const cnb_object = (params) => {
    let language = "uk";
    if (params.language) {
      language = params.language;
    }

    params = cnb_params(params);
    const data = Buffer.from(JSON.stringify(params)).toString("base64");
    const signature = str_to_sign(private_key + data + private_key);

    return { data: data, signature: signature };
  };
  const handlePayment = async () => {
    // console.log("data", data, signature);
    // console.log("signature", signature);
    try {
      const response = await axios.post("/api/order/liqpay", {
        data: data,
        signature: signature,
      });
      setHtml(response.data.data);
      // console.log(response.data);
      setIsOpen(true);
      // return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>
        <span>Оплатити через</span>
        <img
          alt="Pay button"
          name="btn_text"
          // src="https://res.cloudinary.com/dzctqbi3o/image/upload/v1684344202/product%20images/pmuawzivq3xzqzgp8s8a.png"
          src="https://res.cloudinary.com/dzctqbi3o/image/upload/v1684344203/product%20images/tzwuwactikeyarmubdxg.png"
        />
      </button>
      <LiqPayResponse html={html} show={isOpen} onHide={setIsOpen} />
    </div>
  );
};

export default PaymentButton;
