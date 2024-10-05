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
    items: any;
    viewingItem: CartItem | undefined;
};

export type CartAction = CartActionAdd | CartActionRemove | CartActionClear | CartActionViewItem | CartActionClearItem;

export type CartActionAdd = {
    type: "add";
    payload: {
        item: CartItem;
    }
};

export type CartActionClearItem = {
    type: "clearItem";
    payload: {
        id: string;
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

export type CartActionViewItem = {
    type: "viewItem";
    payload: {
        item: CartItem;
    }
};
