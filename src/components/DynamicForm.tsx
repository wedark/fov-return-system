'use client';

import { useState, useRef, useEffect } from 'react';
import { defaultForm, simplifyObjRec } from '~/types/form';
import { PreviewWrapper } from './DynamiсForm.styled';
import type { SimpleForm, SimpleInput, Combination, Item } from '~/types/form';
import { sectionNames } from '~/types/form';

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
            width: '50%',
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
            </tr>
          );
        })}
        <tr>
          {/* add new item */}

          <button
            onClick={() => {
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
              });
            }}
          >
            Add item
          </button>
        </tr>
      </tbody>
    </table>
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
      {/* if  inputType is text / number / incremental*/}
      {/* {(inputType === 'text' || inputType === 'number' || inputType === 'incremental') && ( */}
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
      {/* )} */}
      {/* if inputType is select */}
    </div>
  );
}

// parse form to JSX
function PreviewForm({ form }: { form: SimpleForm }) {
  return (
    <div
      style={{
        border: '1px solid black',
        padding: '1em',
        width: '80%',
        display: 'grid',
        overflowY: 'scroll',
      }}
    >
      <span>Customer Number: {form.customerNumber}</span>
      <h3>Customer Data</h3>
      <span>Business Name: {form.customerDetails.businessName}</span>
      <span>Contact: {form.customerDetails.contact}</span>

      <h3>Address</h3>
      <span>Street: {form.address.street}</span>
      <span>Postal Code: {form.address.postalCode}</span>

      <h3>Internal</h3>
      <span>Handler FOV: {form.internal.handlerFov}</span>
      <span>Order Number: {form.internal.orderNumber}</span>
      <span>Form date: {form.internal.formDate}</span>

      <h3>Items</h3>
      {Object.entries(form.items).map(([key, item]) => (
        <div key={key} style={{ border: '1px solid red', marginBottom: '1em', display: 'grid' }}>
          <span>Item: {key}</span>
          <span>Article Number: {item.articleNumber}</span>
          <span>Description: {item.description}</span>
          <span>Unit: {item.unit}</span>
          <span>Quantity: {item.quantity}</span>
        </div>
      ))}

      <h3>Reasons</h3>
      <span>Notes: {form.reasons.textReasons}</span>
      {Object.entries(form.reasons)
        .slice(1)
        .map(([key, value]) => (
          <span key={key}>
            {key}: {value ? 'Yes' : 'No'}
          </span>
        ))}
      <h3>Actions</h3>
      {Object.entries(form.actions).map(([key, action]) => (
        <div key={key}>
          <span>{key}</span>
          <input type="checkbox" checked={action.used} readOnly />
          <table>
            <tbody>
              <tr>
                <td>Performed by</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>{action.performedBy}</td>
                <td>{action.completed || 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
