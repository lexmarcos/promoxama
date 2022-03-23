import { ObjectID } from 'bson';
import { MongoServerError, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import clientPromise from '../../../lib/mongodb';
import { genericError } from '../../../utils/Errors';
import { IProduct } from './types';

interface IParams {
  [key: string]: string | string[] | ObjectID;
}

async function getAllProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = (await clientPromise).db();
    const data = (await db
      .collection('products')
      .find({})
      .toArray()) as unknown as IProduct[];
    res.status(200).json(data);
  } catch (err: Error | any) {
    return genericError(res);
  }
}

async function getAllProductsByParams(
  req: NextApiRequest,
  res: NextApiResponse,
  params: object
) {
  try {
    const db = (await clientPromise).db();
    const data = (await db
      .collection('products')
      .find(params)
      .toArray()) as unknown as IProduct[];
    res.status(200).json(data);
  } catch (err: Error | any) {
    return genericError(res);
  }
}

function checkIfIdExists(query: NextApiRequestQuery) {
  const params = query as IParams;
  if ('id' in query) {
    params._id = new ObjectID(query.id as string);
    delete query.id;
  }
  return params;
}

export default async function getFunctions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (Object.keys(req.query)) {
    return getAllProductsByParams(req, res, checkIfIdExists(req.query));
  }
  return getAllProducts(req, res);
}
