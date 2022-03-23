import type { NextApiRequest, NextApiResponse } from 'next';
import getFunctions from './gets';
import postFunctions from './posts';
import { IMethods } from './types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const methodsFunctions = {
    GET: getFunctions,
    POST: postFunctions,
    DELETE: () => {},
  };

  return methodsFunctions[req.method as keyof IMethods](req, res);
}
