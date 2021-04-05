import http from 'http';
import fetch from 'node-fetch';
import { NowRequest, NowResponse } from '@vercel/node';

const httpAgent = new http.Agent();

export default async (request: NowRequest, response: NowResponse) => {
  const { query } = request;
  const toUpstream = new URLSearchParams(query as Record<string, any>);
  const ACCESS_TOKEN = process.env.EXCHANGE_RATES_API_ACCESS_TOKEN;
  const res = await fetch(
    `https://api.exchangeratesapi.io/latest?${toUpstream.toString()}&access_key=${ACCESS_TOKEN}`,
    {
      agent: httpAgent,
    },
  );
  const json = await res.json();
  response.status(200).json(json);
};
