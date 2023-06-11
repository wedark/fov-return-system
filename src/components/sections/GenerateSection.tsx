import { SimpleForm, defaultForm } from '~/types/form';
import { GenerateInputField } from '../InputGenerators';

export default function GenerateSection({
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
        // ! Normal filter later
        if (!(section === 'reasons' && key === 'textReasons'))
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
        else return null;
      })}
    </>
  );
}
