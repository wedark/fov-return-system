type InputType = 'date' | 'number' | 'incremental' | 'text' | 'textarea' | 'checkbox' | 'shortText';

// type SectionType = 'mix' | 'items' | 'reasons' | 'agreements' | 'actions';
export const sectionNames = [
  'customerDetails',
  'address',
  'internal',
  'items',
  'reasons',
  'agreements',
  'actions',
];

export interface SimpleInput {
  inputType: InputType;
  value: string | number | boolean;
}
export interface Combination {
  [key: string]: SimpleInput;
}

type ItemsSection = Combination[];

type ReasonsSection = Combination;
interface Action {
  used: boolean;
  performedBy: string;
  completed: Date | boolean;
}

interface ActionsSection {
  [key: string]: Action;
}

interface FinalFormType {
  customerNumber: SimpleInput;
  customerDetails: Combination;
  address: Combination;
  internal: Combination;
  items: ItemsSection;
  reasons: ReasonsSection;
  agreements: Combination;
  actions: ActionsSection;
}

const actionNames = ['return', 'exchange', 'newReceipt', 'retrieve', 'credit'];

// auto-generate the actions section
const actionsSection = actionNames.reduce((acc, actionName) => {
  acc[actionName] = {
    used: false,
    performedBy: '',
    completed: false,
  };
  return acc;
}, {} as ActionsSection);

const reasonNames = ['inputError', 'pickFault', 'customerError', 'damage'];

// auto-generate the reasons section
const reasonsSection = reasonNames.reduce((acc, reasonName) => {
  acc[reasonName] = {
    inputType: 'checkbox',
    value: false,
  };
  return acc;
}, {} as ReasonsSection);

// function to take the default obj and for all objects that have value as a key put the value as the value of the key
// (make it simpler and without inputType)

export function simplifyObjRec(obj: any) {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (typeof obj[key] === 'object' && obj[key].hasOwnProperty('value')) {
      newObj[key] = obj[key].value;
    } else if (typeof obj[key] === 'object') {
      newObj[key] = simplifyObjRec(obj[key]);
    }
  }
  return newObj;
}
export interface Item {
  articleNumber: number;
  description: string;
  unit: string;
  quantity: number;
}
// interface Action {
//   used: boolean;
//   performedBy: string;
//   completed: Date | string;
// }
const actions = ['return', 'exchange', 'newReceipt', 'retrieve', 'credit'];

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

export const defaultForm: FinalFormType = {
  customerNumber: {
    inputType: 'number',
    value: 0,
  },
  customerDetails: {
    businessName: {
      inputType: 'text',
      value: '',
    },
    contact: {
      inputType: 'text',
      value: '',
    },
  },
  address: {
    street: {
      inputType: 'text',
      value: '',
    },
    postalCode: {
      inputType: 'text',
      value: '',
    },
  },
  internal: {
    handlerFov: {
      inputType: 'text',
      value: '',
    },
    orderNumber: {
      inputType: 'number',
      value: 0,
    },
    formDate: {
      inputType: 'date',
      value: new Date().toISOString().slice(0, 10),
    },
  },
  items: [
    {
      articleNumber: {
        inputType: 'number',
        value: 0,
      },
      description: {
        inputType: 'text',
        value: '',
      },
      unit: {
        inputType: 'shortText',
        value: '',
      },
      quantity: {
        inputType: 'incremental',
        value: 0,
      },
    },
    {
      articleNumber: {
        inputType: 'number',
        value: 0,
      },
      description: {
        inputType: 'text',
        value: '',
      },
      unit: {
        inputType: 'text',
        value: '',
      },
      quantity: {
        inputType: 'incremental',
        value: 0,
      },
    },
  ],
  reasons: {
    textReasons: {
      inputType: 'textarea',
      value: '',
    },
    ...reasonsSection,
  },
  agreements: {
    text: {
      inputType: 'textarea',
      value: '',
    },
  },
  actions: actionsSection,
};

// const zodReturnFormSchema = z.object({
//   customerNumber: z.number(),
//   customerDetails: z.object({
//     businessName: z.string(),
//     contact: z.string(),
//   }),
//   address: z.object({
//     street: z.string(),
//     postalCode: z.string(),
//   }),
//   internal: z.object({
//     handlerFov: z.string(),
//     orderNumber: z.number(),
//     formDate: z.date(),
//   }),
//   items: z.array(
//     z.object({
//       articleNumber: z.number(),
//       description: z.string(),
//       unit: z.string(),
//       quantity: z.number(),
//     })
//   ),
//   reasons: z.object({
//     textReasons: z.string(),
//     ...reasonsSection,
//   }),
//   agreements: z.object({
//     text: z.string(),
//   }),
//   actions: z.object({
//     ...actionsSection,
//   }),
// });
