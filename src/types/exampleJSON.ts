export const formDataExample = {
  customerNumber: 12005921,
  customerDetails: {
    businessName: 'ABC Company',
    contact: 'John Doe',
  },
  address: {
    street: '123 Main St',
    postalCode: '1234AB',
  },
  internal: {
    handlerFov: 'John Doe',
    orderNumber: 576560,
    formDate: '2020-01-01',
  },
  items: [
    {
      articleNumber: 123456,
      description: 'Product 1',
      unit: 'pcs',
      quantity: 1,
    },
  ],
  reason: {
    textReasons: 'Reason for return',
    inputError: false,
    pickFault: false,
    customerOrderError: false,
    demage: false,
  },
  agreementsMade: 'Agreements made',

  actions: {
    return: {
      used: true,
      performedBy: 'John Doe',
      completed: false, // false or date
    },
    exchange: {
      used: false,
      performedBy: '',
      completed: false, // false or date
    },
    newReceipt: {
      used: false,
      performedBy: '',
      completed: false, // false or date
    },
    retrieve: {
      used: false,
      performedBy: '',
      completed: false, // false or date
    },
    credit: {
      used: false,
      performedBy: '',
      completed: false, // false or date
    },
  },
};
