import { useState } from 'react';
import axios from 'axios';
import crypto from 'crypto';

const LiqPay = (public_key, private_key) => {
const host = "https://www.liqpay.ua/api/";

const api = async (path, params) => {
if (!params.version) {
throw new Error('version is null');
}
params.public_key = public_key;
const data = Buffer.from(JSON.stringify(params)).toString('base64');
const signature = str_to_sign(private_key + data + private_key);

  try {
    const response = await axios.post(host + path, { data: data, signature: signature });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const cnb_form = (params) => {
let language = "uk";
if (params.language) {
    language = params.language;
  }
  
  params = cnb_params(params);
  const data = Buffer.from(JSON.stringify(params)).toString('base64');
  const signature = str_to_sign(private_key + data + private_key);
  
  return (
    <form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
      <input type="hidden" name="data" value={data} />
      <input type="hidden" name="signature" value={signature} />
      <input type="image" src={`//static.liqpay.ua/buttons/p1${language}.radius.png`} name="btn_text" />
    </form>
  );
};

const cnb_signature = (params) => {
params = cnb_params(params);
const data = Buffer.from(JSON.stringify(params)).toString('base64');
return str_to_sign(private_key + data + private_key);
};

const cnb_params = (params) => {
params.public_key = public_key;
if (!params.version) {
    throw new Error('version is null');
  }
  if (!params.amount) {
    throw new Error('amount is null');
  }
  if (!params.currency) {
    throw new Error('currency is null');
  }
  if (!params.description) {
    throw new Error('description is null');
  }
  
  return params;
};

const str_to_sign = (str) => {
const sha1 = crypto.createHash('sha1');
sha1.update(str);
return sha1.digest('base64');
};

const cnb_object = (params) => {
let language = "uk";
if (params.language) {
    language = params.language;
  }
  
  params = cnb_params(params);
  const data = Buffer.from(JSON.stringify(params)).toString('base64');
  const signature = str_to_sign(private_key + data + private_key);
  
  return { data: data, signature: signature };
};

return {
api,
cnb_form,
cnb_signature,
cnb_params,
cnb_object
};
};

export default LiqPay;