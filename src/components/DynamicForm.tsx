'use client';

import { useState, useRef, useEffect } from 'react';
import { defaultForm, simplifyObjRec } from '~/types/form';
import { PreviewWrapper } from './DynamiсForm.styled';
import type { SimpleForm, SimpleInput, Combination, Item } from '~/types/form';
import { sectionNames } from '~/types/form';
import PreviewForm from './FormPreview';

const simplifiedForm: SimpleForm = simplifyObjRec(defaultForm);

export default function DynamicForm() {
  const [form, setForm] = useState<SimpleForm>(simplifiedForm);

  return (
    <>
      <h1>Dynamic Form</h1>
      <PreviewWrapper>
        <div>
          <h2>Default</h2>
          <textarea value={JSON.stringify(defaultForm, null, 2)} readOnly />
        </div>
        <div>
          <h2>Simplified</h2>
          <textarea value={JSON.stringify(simplifiedForm, null, 2)} readOnly />
        </div>
        <div style={{ alignItems: 'flex-start', width: '40%' }}>
          <h2>Preview</h2>
          <PreviewForm form={form} />
        </div>
      </PreviewWrapper>
      <PreviewWrapper>
        <div
          style={{
            width: '70%',
            border: '1px solid black',
            justifyContent: 'flex-start',
            overflowY: 'scroll',
          }}
        >
          <h2>Form</h2>
          <DisplayForm form={form} setForm={setForm} />
        </div>
      </PreviewWrapper>
    </>
  );
}

// use sectionNames to generate form
function DisplayForm({ form, setForm }: { form: SimpleForm; setForm: (form: SimpleForm) => void }) {
  return (
    <>
      {/* <span>Customer Number:</span> */}
      <GenerateInputField
        name="customerNumber"
        input={{
          inputType: defaultForm.customerNumber.inputType,
          value: form.customerNumber,
        }}
        setFunction={(value) => {
          setForm({ ...form, customerNumber: value as typeof form.customerNumber });
        }}
      />
      <h3>Customer Information</h3>
      {GenerateSection({ section: 'customerDetails', form, setForm })}

      <h3>Items</h3>
      {DisplayItems({ items: form.items, form, setForm })}
      {/* add new item */}
      <button
        onClick={() =>
          setForm({
            ...form,
            items: {
              ...form.items,
              [Object.keys(form.items).length]: {
                articleNumber: 0,
                description: '',
                unit: '',
                quantity: 0,
              },
            },
          })
        }
      >
        Add new item
      </button>

      <h3>Address</h3>
      {GenerateSection({ section: 'address', form, setForm })}
      <h3>Internal</h3>
      {GenerateSection({ section: 'internal', form, setForm })}
      <h3>Reasons</h3>
      {GenerateSection({ section: 'reasons', form, setForm })}
    </>
  );
}
// Item = {
// articleNumber: number;
//   description: string;
//   unit: string;
//   quantity: number;
// }
function DisplayItems({
  items,
  form,
  setForm,
}: {
  items: { [key: number]: Item };
  form: SimpleForm;
  setForm: (form: SimpleForm) => void;
}) {
  return (
    <table>
      <tbody>
        <tr>
          {Object.entries(items[0]).map(([key, value]) => {
            return <td key={key}>{key}</td>;
          })}
        </tr>
        {Object.entries(items).map(([numKey, item]) => {
          return (
            <tr key={numKey}>
              {Object.entries(item).map(([key, value]) => {
                return (
                  <td key={key}>
                    <input
                      type={defaultForm.items[0][key].inputType}
                      value={value as typeof value}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          items: {
                            ...form.items,
                            [numKey]: {
                              ...form.items[Number(numKey)],
                              [key]: e.target.value as typeof value,
                            },
                          },
                        });
                      }}
                    />
                  </td>
                );
              })}
              {
                // delete button if not first item
                Number(numKey) !== 0 && (
                  <td>
                    <button
                      onClick={() => {
                        const newItems = { ...form.items };
                        delete newItems[Number(numKey)];
                        setForm({ ...form, items: newItems });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )
              }
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function GenerateItemFields({
  numKey,
  item,
  form,
  setForm,
}: {
  numKey: string;
  item: Item;
  form: SimpleForm;
  setForm: (form: SimpleForm) => void;
}) {
  return (
    <>
      {Object.entries(item).map(([key, value]) => {
        return (
          <td key={key}>
            <input
              type={defaultForm.items[0][key].inputType}
              value={value as typeof value}
              onChange={(e) => {
                setForm({
                  ...form,
                  items: {
                    ...form.items,
                    [numKey]: {
                      ...form.items[Number(numKey)],
                      [key]: e.target.value as typeof value,
                    },
                  },
                });
              }}
            />
          </td>
        );
      })}
    </>
  );
}

function DeleteButton({
  numKey,
  form,
  setForm,
}: {
  numKey: string;
  form: SimpleForm;
  setForm: (form: SimpleForm) => void;
}) {
  return (
    <button
      onClick={() => {
        const newItems = { ...form.items };
        delete newItems[Number(numKey)];
        setForm({ ...form, items: newItems });
      }}
    >
      Delete
    </button>
  );
}

function GenerateSection({
  section,
  form,
  setForm,
}: {
  section: 'customerDetails' | 'address' | 'internal' | 'reasons';
  form: SimpleForm;
  setForm: (form: SimpleForm) => void;
}) {
  return (
    <>
      {Object.entries(form[section]).map(([key, value]) => {
        return (
          <GenerateInputField
            key={key}
            name={key}
            input={{
              inputType: defaultForm[section][key].inputType,

              value: value as typeof value,
            }}
            setFunction={(value) => {
              setForm({
                ...form,
                [section]: { ...form[section], [key]: value as typeof value },
              });
            }}
          />
        );
      })}
    </>
  );
}

function GenerateInputField({
  name,
  input,
  setFunction,
}: {
  name: string;
  input: SimpleInput;
  setFunction: (value: typeof input.value) => void;
}) {
  const inputType = input.inputType;
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '0.5em' }}>
      <span>{name}</span>
      <input
        type={inputType === 'incremental' ? 'number' : inputType}
        value={
          inputType === 'incremental' || inputType === 'number'
            ? (input.value as number)
            : (input.value as string)
        }
        checked={inputType === 'checkbox' ? (input.value as boolean) : undefined}
        onChange={(e) => {
          setFunction(e.target[inputType === 'checkbox' ? 'checked' : 'value']);
        }}
        className={inputType === 'incremental' ? 'input-incremental' : ''}
      />
    </div>
  );
}
