import { defaultForm } from '~/types/form';
// import { sectionNames } from '~/types/form';
import { GenerateInputField } from './InputGenerators';
import DisplayActions from './sections/DisplayActions';

import type { SimpleForm } from '~/types/form';
import DisplayItems from './sections/DisplayItems';
import GenerateSection from './sections/GenerateSection';

// const simplifiedForm: SimpleForm = simplifyObjRec(defaultForm);

export default function DynamicForm({
  form,
  setForm,
}: {
  form: SimpleForm;
  setForm: (form: SimpleForm) => void;
}) {
  return <DisplayForm form={form} setForm={setForm} />;
}

// use sectionNames to generate form
function DisplayForm({ form, setForm }: { form: SimpleForm; setForm: (form: SimpleForm) => void }) {
  return (
    <div>
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

      <h3>Address</h3>
      {GenerateSection({ section: 'address', form, setForm })}
      <h3>Internal</h3>
      {GenerateSection({ section: 'internal', form, setForm })}

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

      <h3>Reasons</h3>
      {GenerateSection({ section: 'reasons', form, setForm })}
      <h3>Agreements</h3>
      {GenerateInputField({
        name: 'Agreements',
        input: {
          inputType: defaultForm.agreements.text.inputType,
          value: form.agreements.text,
        },
        setFunction: (value) => {
          setForm({
            ...form,
            agreements: { ...form.agreements, text: value as typeof form.agreements.text },
          });
        },
      })}
      <h3>Actions</h3>
      <DisplayActions actions={form.actions} form={form} setForm={setForm} />
    </div>
  );
}
