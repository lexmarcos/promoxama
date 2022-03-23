import type { NextPage } from 'next';
import { useEffect } from 'react';

const Products: NextPage = () => {
  const getProducts = async () => {
    console.log('toma');
    const response: Response = await fetch('/api/products');
    console.log(await response.json());
    // return await response.json();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <div>txma</div>;
};

export default Products;
