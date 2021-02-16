import fetch from 'node-fetch';
import { NowRequest, NowResponse } from '@vercel/node';

export default async (request: NowRequest, response: NowResponse) => {
  const { query } = request;
  const toUpstream = new URLSearchParams(query as Record<string, any>);
  const res = await fetch(`https://api.exchangeratesapi.io/history?${toUpstream.toString()}`);
  const json = await res.json();
  response.status(200).json(json);
};
