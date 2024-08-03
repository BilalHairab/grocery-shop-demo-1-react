export interface CartItemCounter {
    count: number;
    item: CartItem;
}

export type CartItem = {
  id: number;
  title: string;
  type: string;
  description: string;
  filename: string;
  height: number;
  width: number;
  price: number;
  rating: number;
};

export type CartState = {
    items: Map<number, CartItemCounter>;
};

export type CartAction = CartActionAdd | CartActionRemove | CartActionClear;

export type CartActionAdd = {
    type: "add";
    payload: {
        item: CartItem;
    }
};

export type CartActionRemove = {
    type: "remove";
    payload: {
        item: CartItem;
    }
};

export type CartActionClear = {
    type: "clear";
    payload: {
    }
};
