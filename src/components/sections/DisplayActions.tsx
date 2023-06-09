import { Actions, SimpleForm } from '~/types/form';
import { GenerateInputField } from '../InputGenerators';

export default function DisplayActions({
  actions,
  form,
  setForm,
}: {
  actions: Actions;
  form: SimpleForm;
  setForm: (form: SimpleForm) => void;
}) {
  return (
    <>
      {Object.entries(actions).map(([key, value]) => {
        return (
          <div
            //  style={{ display: 'flex', flexDirection: 'row', gap: '1em' }}
            key={key}
          >
            <GenerateInputField
              name={key}
              input={{
                inputType: 'checkbox',
                value: value.used as boolean,
              }}
              setFunction={(value) => {
                setForm({
                  ...form,
                  actions: {
                    ...form.actions,
                    [key]: { ...form.actions[key], used: value as typeof value },
                  } as typeof form.actions,
                });
              }}
            />
            <GenerateInputField
              name="Performed by"
              input={{
                inputType: 'text',
                value: value.performedBy as string,
              }}
              setFunction={(value) => {
                setForm({
                  ...form,
                  actions: {
                    ...form.actions,
                    [key]: { ...form.actions[key], performedBy: value as typeof value },
                  } as typeof form.actions,
                });
              }}
            />
            <GenerateInputField
              name="Completed"
              input={{
                inputType: 'date',
                value: String(value.completed),
              }}
              setFunction={(value) => {
                setForm({
                  ...form,
                  actions: {
                    ...form.actions,
                    [key]: { ...form.actions[key], completed: value as typeof value },
                  } as typeof form.actions,
                });
              }}
            />
          </div>
        );
      })}
    </>
  );
}
