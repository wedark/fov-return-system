'use client';
import { Fragment, useState } from 'react';
import { AnyZodObject } from '~/lib/wrappedZod';
import type { ReturnForm } from '~/types/returnForm';
import defaultReturnForm, { zodReturnFormSchema } from '~/types/returnForm';
import { formsJsonFiles } from '~/utils/allForms';

export default function InputForm() {
  const [form, setForm] = useState<ReturnForm>(defaultReturnForm);
  // get form from manager

  console.log(formsJsonFiles);
  // generate form to display
  return (
    <>
      <h1>Creating a new file</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          await fetch('/manager', { method: 'POST', body: JSON.stringify(form) });

          // redirect to overview or editing the new doc.
        }}
      >
        {/* {DisplayForm(form, setForm)} */}
        <button type="submit">Save</button>
        {ParseZodFormSchemaIntoJsx(zodReturnFormSchema, form, setForm)}
      </form>
      {/* save button */}
    </>
  );
}
// function DisplayForm(form: ReturnForm, setForm: (form: ReturnForm) => void) {
//   // const returnForm = {} as ReturnForm;
//   const sections = typeSafeObjectKeys(form);

//   return sections.map((section) => {
//     // console.log('section', section);
//     const fields = typeSafeObjectKeys(form[section]);

//     return (
//       <div key={section}>
//         <h1>{section}</h1>
//         <div style={{ display: 'grid', width: '40em' }}>
//           {fields.map((field) => {
//             // console.log('field', field);
//             const fieldType = typeof form[section][field];
//             return (
//               <>
//                 <span key={field}>
//                   {field} : {fieldType}
//                 </span>
//                 {(fieldType === 'string' || fieldType === 'number') && (
//                   <input
//                     type={fieldType}
//                     key={field}
//                     value={form[section][field] as typeof fieldType}
//                     onChange={(e) => {
//                       setForm({
//                         ...form,
//                         [section]: { ...form[section], [field]: e.target.value },
//                       });
//                     }}
//                   />
//                 )}
//               </>
//             );
//           })}
//         </div>
//       </div>
//     );
//   });
// }

function typeSafeObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

function ParseZodFormSchemaIntoJsx(
  schema: AnyZodObject,
  form: ReturnForm,
  setForm: React.Dispatch<React.SetStateAction<ReturnForm>>,
) {
  // const form = {} as ReturnForm;
  const sections = Object.keys(schema.shape);
  // console.log('🚀 ~ file: InputForm.tsx:79 ~ ParseZodFormSchemaIntoJsx ~ sections:', sections);

  function renderField(field: string, section?: string) {
    const isObject = section !== undefined;

    const fieldType = (
      isObject
        ? (schema.shape[section].shape[field]._def.typeName as string)
        : (schema.shape[field]._def.typeName as string)
    )
      .slice(3)
      .toLowerCase();

    // if (field === 'actions') {
    //   console.log('fieldType', fieldType);
    //   console.log(schema.shape[field]);
    // }
      // const isSection = fieldType === 'object';
      // console.log('section', section);
      // console.log('field', field);
    return (
      <Fragment key={field}>
        <span>
          {field} : {fieldType}
        </span>
        {(fieldType === 'string' || fieldType === 'number') && (
          <input
            type={fieldType}
            value={
              section === undefined 
                ? form[field as keyof typeof form] : '' as any
                // : form[section as keyof typeof form][field as keyof typeof form[section]]
            }
            onChange={(e) => {
              if (section === undefined) return;

              setForm({
                ...form,
                [section]: isObject ? { ...(form[section as keyof typeof form] as object), [field]: e.target.value } : e.target.value,

                //  { ...form[section as keyof typeof form], [field]: e.target.value },
              });
            }}
          />
        )}
        {fieldType === 'boolean' && (
          <input
            type="checkbox"
            // value={form[section][field] as typeof fieldType}
            // onChange={(e) => {
            //   setForm({
            //     ...form,
            //     [section]: { ...form[section], [field]: e.target.value },
            //   });
            // }}
          />
        )}
      </Fragment>
    );
  }

  return sections.map((section) => {
    const isObject = schema.shape[section]._def.typeName === 'ZodObject';
    if (!isObject) return renderField(section);

    const fields = Object.keys(schema.shape[section].shape);
    // console.log('🚀 ~ file: InputForm.tsx:83 ~ returnsections.map ~ fields:', fields);

    return (
      <div key={section}>
        <h1>{section}</h1>
        <div style={{ display: 'grid', width: '40em' }}>
          {fields.map((field) => renderField(field, section))}
        </div>
      </div>
    );
  });
}

// TODO! two folders — one for completed return forms, one for in progress. The idea is that the completed folder is much larger, and thus requires much more time to search inside it. This way we're keeping the ability to search fast in what's actually important.
