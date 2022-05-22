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
    <div className="py-14 grid grid-cols-4 gap-4 xl:px-20 2xl:px-52 bg-gray-100">
      {products.map((product) => (
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              className="px-5 pb-2 pt-5 xl:w-80 md:w-auto"
              src="https://a-static.mlcdn.com.br/1200x1200/iphone-11-apple-64gb-branco-61-12mp-ios/magazineluiza/155614100/af1cd7d9c89d7306b52490a0ce1b8b34.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h3 className="">{product.name}</h3>
            <h6 className="text-sm line-through text-gray-400">
              R$ {product.price_without_discount}
            </h6>
            <h6 className="text-2xl font-bold -mt-3">R$ {product.price}</h6>
            <div className="text-sm text-gray-400 -mt-1">à vista</div>
            <div className="text-gray-600 -mt-3">
              ou {product.installments} de R$ {product.installment_price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
