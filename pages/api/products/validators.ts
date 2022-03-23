import * as yup from 'yup';

export const schemaProduct = yup.object().shape({
  link: yup.string().url(),
  name: yup.string().required(),
  color: yup.string().required(),
  price: yup.number().required().positive(),
  price_without_discount: yup.number().required().positive(),
  installments: yup.string().required(),
  installment_price: yup.number().required().positive(),
  refer_link: yup.string().url(),
  id: yup.string().required(),
  delivered_by: yup.string().required(),
  section: yup.string().required(),
});

export const schemaArrayOfProducts = yup.array().of(schemaProduct)
