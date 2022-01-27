import axios from 'axios';
import React, { useState } from 'react';
export const HOME_URL = "https://localhost:4000";

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try{
    const res = await axios.get(`${HOME_URL}`);
    const data = res.data;
    console.log(data);
  } catch(error){
    throw error;
  }
}

export async function detailedProductView() {
  try{
    const { data } = await axios.get();
  } catch(error){

  }
}

const axios = require('axios');

async function makeRequest() {

    const config = {
        method: 'get',
        url: 'http://webcode.me'
    }

    let res = await axios(config)

    console.log(res.status);
}

makeRequest();