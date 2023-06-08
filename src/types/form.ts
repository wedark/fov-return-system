type InputType =
  | 'text'
  | 'number'
  | 'incremental'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'textarea'
  | 'date';
type SectionType = 'mix' | 'items' | 'reasons' | 'agreements' | 'actions';

interface SimpleInput {
  inputType: InputType;
  value: string | number | boolean;
}
interface Combination {
  [key: string]: SimpleInput;
}

type ItemsSection = Combination[];

type ReasonsSection = Combination;
interface Action {
  used: boolean;
  performedBy: string;
  completed: string | boolean;
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
  reason: ReasonsSection;
  agreementsMade: Combination;
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

const reasonNames = ['inputError', 'pickFault', 'customerOrderError', 'damage'];

// auto-generate the reasons section
const reasonsSection = reasonNames.reduce((acc, reasonName) => {
  acc[reasonName] = {
    inputType: 'checkbox',
    value: false,
  };
  return acc;
}, {} as ReasonsSection);

const defaultForm: FinalFormType = {
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
      inputType: 'number',
      value: 0,
    },
  },
  internal: {
    handlerFov: {
      inputType: 'text',
      value: '',
    },
    orderNumber: {
      inputType: 'text',
      value: '',
    },
    formDate: {
      inputType: 'date',
      value: '',
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
        inputType: 'text',
        value: '',
      },
      quantity: {
        inputType: 'incremental',
        value: 0,
      },
    },
  ],
  reason: {
    textReasons: {
      inputType: 'textarea',
      value: '',
    },
    ...reasonsSection,
  },
  agreementsMade: {
    text: {
      inputType: 'textarea',
      value: '',
    },
  },
  actions: actionsSection,
};
