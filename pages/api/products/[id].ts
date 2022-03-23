import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { Exception, genericError } from '../../../utils/Errors';
import { IProduct } from './types';


export default async function handler(
  { query: { id } }: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = (await clientPromise).db();
    const data = (await db.collection('products').findOne({
      _id: new ObjectId(id as string)
    })) as unknown as IProduct;

    if (!data) {
      throw new Exception(400, 'Esse ID não existe');
    }

    res.status(200).json(data);
  } catch (err: Error | Exception | unknown) {
    if (err instanceof Exception) {
      return res.status(err.code).json(err);
    }
    return genericError(res);
  }
}
