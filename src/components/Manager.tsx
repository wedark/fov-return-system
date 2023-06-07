'use client';

import type { ReturnForm } from '~/types/returnForm';
import defaultReturnForm from '~/types/returnForm';
import { useMemo, useState } from 'react';
export default function Manager() {
  const [form, setForm] = useState<ReturnForm>(defaultReturnForm);
  const formGenerator = useMemo(() => new FormGenerator(setForm), []);

  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          formGenerator.generate();
        }}
      >
        Create file
      </button>
    </div>
  );
}

class FormGenerator {
  constructor(public setReturnForm: React.Dispatch<React.SetStateAction<ReturnForm>>) {}

  async generate() {
    const returnForm = {} as ReturnForm;
    const sections = typeSafeObjectKeys(defaultReturnForm);

    sections.map((section) => {
      const fields = typeSafeObjectKeys(returnForm[section]);

      return (
        <div key={section}>
          <h1>{section}</h1>
          {fields.map((field) => {
            const fieldType = typeof defaultReturnForm[section][field];
            if (fieldType === 'string') {
              return (
                <input
                  type={fieldType}
                  key={field}
                  value={returnForm[section][field] as string}
                  onChange={(e) => {
                    this.setReturnForm({
                      ...returnForm,
                      [section]: { ...returnForm[section], [field]: e.target.value },
                    });
                  }}
                />
              );
            }
            return <input key={field} value="kek" />;
          })}
        </div>
      );
    });

    // const streetType = typeof defaultReturnForm.customerData.address.street;

    // const res = await fetch('/manager');Ob
    // const data: ReturnForm = await res.json();
    // console.log(data);
  }
}

function typeSafeObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

type FieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'radio';
// function generateField(type: FieldType, value: unknown, setValue: void) {
//   return (
//     <div>
//       <input type={type} />
//     </div>
//   );
// }
