export type TUser = {
  name: string;
  email: string;
};

export type TMassage = {
  success: boolean;
  orders: [
    {
      ingredients: string[];
      _id: string;
      name: string;
      status: string;
      number: number;
      createdAt: Date;
      updatedAt: Date;
      price: number;
      __v: number;
    },
  ];
  total: number;
  totalToday: number;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string; // eslint-disable-line
  image_large: string; // eslint-disable-line
  __v: number;
  uniqueKey?: number;
  count?: number;
};

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  owner?: {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
  };
  __v: number;
};

export interface WebSocketEventMap {
  close: CloseEvent;
  error: Event;
  message: MessageEvent;
  open: Event;
}
