'use strict';

import crypto from "./src/crypto";
import request from "./src/request";
import response from "./src/response";

const urlParamsToObj = request.urlParamsToObj;
const getXmlData = request.getXmlData;
const parseXML = response.parseXML;
const handleDTDString = response.handleDTDString;
const Encrypt = crypto.Encrypt;
const Decrypt = crypto.Decrypt;

export default {
  urlParamsToObj,
  getXmlData,
  parseXML,
  handleDTDString,
  Encrypt,
  Decrypt
}