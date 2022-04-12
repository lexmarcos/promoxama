import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

export interface IProduct {
  link: string;
  name: string;
  color: string;
  price: number;
  price_without_discount: number;
  installments: string;
  installment_price: number;
  refer_link: string;
  id: string;
  delivered_by: string;
  section: string;
}

const Products: NextPage = () => {
  const getProducts = async () => {
    console.log('toma');
    const response: Response = await fetch('/api/products');
    const productsResponse: IProduct[] = await response.json();
    setProducts(productsResponse);
  };

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4  md:grid-cols-5">
      {products.map((product) => (
        <div className="card w-80 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://a-static.mlcdn.com.br/1500x1500/iphone-11-apple-64gb-branco-61-12mp-ios/magazineluiza/155614100/af1cd7d9c89d7306b52490a0ce1b8b34.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
