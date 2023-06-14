const actions = ['return', 'exchange', 'newReceipt', 'retrieve', 'credit'] as const;
export interface Item {
  articleNumber: number;
  description: string;
  unit: string;
  quantity: number;
}

interface Action {
  used: boolean;
  performedBy: string;
  completed: Date | boolean;
}

export type Actions = {
  [key in (typeof actions)[number]]: Action;
};
export interface SimpleForm {
  customerNumber: number;
  customerDetails: {
    businessName: string;
    contact: string;
  };
  address: {
    street: string;
    postalCode: string;
  };
  internal: {
    handlerFov: string;
    orderNumber: number;
    formDate: string;
  };
  items: {
    [key: number]: Item;
  };
  reasons: {
    textReasons: string;
    inputError: boolean;
    pickFault: boolean;
    customerError: boolean;
    damage: boolean;
  };
  agreements: {
    text: string;
  };
  actions: Actions;
}
