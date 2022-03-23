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

export interface IMethods {
  GET: Function;
  POST: Function;
  DELETE: Function;
}
