import { ZodType } from 'zod/lib';
import { z } from '../lib/wrappedZod';

const defaultReturnForm: ReturnForm = {
  // customerNumber: 0,
  customerData: {
    businessName: '',

    street: '',
    postalCode: 0, // Postal code

    handlerFov: '',
    orderNumber: '',
    requestDate: '',
  },
};

export default defaultReturnForm;

type BaseReturnForm = typeof defaultReturnForm;

export type ReturnForm = {
  // Main sections
  // customerNumber: number;
  customerData: CustomerData;
};

interface CustomerData {
  businessName: string;
  street: string;
  postalCode: number;
  handlerFov: string;
  orderNumber: string;
  requestDate: string;
}

interface ReasonForReturnData {}

interface AgreementsMadeData {}

interface ActionsData {}

//? default form type

type SectionType = 'mix' | 'checkboxSet' | 'radioSet';
type InputType = 'text' | 'number' | 'date' | 'checkbox' | 'radio' | 'select' | 'textarea';

interface Input {
  name: string;
  type: InputType;
  value: string | number | boolean;
}

type Section = {
  type: SectionType;
  value?: string | string[];
  inputs: Input[];
};

type FormType = {
  [key: string]: Section;
};

const defaultForm: FormType = {
  customerData: {
    type: 'mix',
    inputs: [
      {
        name: 'businessName',
        type: 'text',
        value: '',
      },
      {
        name: 'street',
        type: 'text',
        value: '',
      },
      {
        name: 'postalCode',
        type: 'text',
        value: '',
      },
      {
        name: 'handlerFov',
        type: 'text',
        value: '',
      },
      {
        name: 'orderNumber',
        type: 'text',
        value: '',
      },
      {
        name: 'requestDate',
        type: 'date',
        value: '',
      },
    ],
  },
  reasonForReturnData: {
    type: 'checkboxSet',
    inputs: [
      {
        name: 'broken',
        type: 'checkbox',
        value: false,
      },
      {
        name: 'wrongOrder',
        type: 'checkbox',
        value: false,
      },
    ],
  },
  agreementsMadeData: {
    type: 'checkboxSet',
    inputs: [
      {
        name: 'agreement1',
        type: 'checkbox',
        value: false,
      },
      {
        name: 'agreement2',
        type: 'checkbox',
        value: false,
      },
    ],
  },
  actionsData: {
    type: 'radioSet',
    inputs: [
      {
        name: 'action1',
        type: 'radio',
        value: false,
      },
      {
        name: 'action2',
        type: 'radio',
        value: false,
      },
    ],
  },
};

// Define a custom schema for false type
const falseTypeSchema = z.custom((value) => {
  if (value === false) {
    return true;
  } else {
    throw new Error('Value is not of false type');
  }
});

// Define an enum of allowed action keys
const actionKeys = z.enum(['return', 'exchange', 'newReceipt', 'retrieve', 'credit']);

type ActionKey = z.infer<typeof actionKeys>;
type ActionsRecord = Record<ActionKey, z.infer<typeof actionSchema>>;

const actionsRecord = <T extends ZodType>(type: T) =>
  (z.record(type) as unknown as ZodType<ActionsRecord>).refine((val) => {
    const keys = Object.keys(val);
    return actionKeys.parse(keys);
  });

// Define the sub-schema for each action
const actionSchema = z.object({
  used: z.boolean(),
  performedBy: z.string(),
  completed: falseTypeSchema.or(z.date()), // false or date
});

export const zodReturnFormSchema = z.object({
  customerNumber: z.number(),
  customerDetails: z.object({
    businessName: z.string(),
    contact: z.string(),
  }),
  address: z.object({
    street: z.string(),
    postalCode: z.string(),
  }),
  internal: z.object({
    handlerFov: z.string(),
    orderNumber: z.number(),
    formDate: z.date(),
  }),
  items: z.array(
    z.object({
      articleNumber: z.number(),
      description: z.string(),
      unit: z.string(),
      quantity: z.number(),
    }),
  ),
  reason: z.object({
    textReasons: z.string({ description: 'SOME REASON' }),
    inputError: z.boolean(),
    pickFault: z.boolean(),
    customerOrderError: z.boolean(),
    damage: z.boolean(),
  }),
  agreementsMade: z.string(), // textarea

  // actions: {
  //   return: z.object({
  //     used: z.boolean(),
  //     performedBy: z.string(),
  //     completed: falseTypeSchema.or(z.date()), // false or date
  //   }),
  //   exchange: {
  //     used: false,
  //     performedBy: '',
  //     completed: false, // false or date
  //   },
  //   newReceipt: {
  //     used: false,
  //     performedBy: '',
  //     completed: false, // false or date
  //   },
  //   retrieve: {
  //     used: false,
  //     performedBy: '',
  //     completed: false, // false or date
  //   },
  //   credit: {
  //     used: false,
  //     performedBy: '',
  //     completed: false, // false or date
  //   },
  // },
  // actions: z.record(actionSchema).refine((val) => {
  //   const keys = Object.keys(val);
  //   return actionKeys.parse(keys);
  // }),
  actions: actionsRecord(actionSchema),
});
// console.log('🚀 ~ file: returnForm.ts:165 ~ zodReturnForm:', zodReturnFormSchema.shape.actions);

// zodReturnFormSchema.shape.actions._type.
