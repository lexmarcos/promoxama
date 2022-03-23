import { MongoServerError } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';
import clientPromise from '../../../lib/mongodb';
import { IProduct } from './types';
import { schemaArrayOfProducts, schemaProduct } from './validators';

async function insertOneProduct(req: NextApiRequest, res: NextApiResponse) {
  const product: IProduct = req.body;
  try {
    await schemaProduct.validate(product);
    const db = (await clientPromise).db();
    await db.collection('products').insertOne(product);
    return res.status(200).json(product);
  } catch (err: ValidationError | unknown) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.message });
    }
  }
}

async function insertManyProducts(req: NextApiRequest, res: NextApiResponse) {
  const products: IProduct[] = req.body.products;
  try {
    await schemaArrayOfProducts.validate(products);
    const db = (await clientPromise).db();
    await db.collection('products').insertMany(products);
    return res.status(200).json(products);
  } catch (err: ValidationError | unknown) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export default async function postFunctions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if ('products' in req.body) {
      return insertManyProducts(req, res);
    }
    return insertOneProduct(req, res);
  } catch (err: MongoServerError | any) {
     return res.status(400).json(err);
  }
}
