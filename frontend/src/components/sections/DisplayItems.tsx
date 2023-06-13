import { Item, SimpleForm, defaultForm } from '~/types/form';
import { GenerateOnlyInput } from '../InputGenerators';
import { toCapitalizedWords } from '~/utils/toCapitalizedWords';
import { ItemDeleteButton } from '../DynamiсForm.styled';

function GenerateItemFields({
  numKey,
  item,
  // form,
  setForm,
}: {
  numKey: string;
  item: Item;
  // form: SimpleForm;
  // React set state function
  setForm: React.Dispatch<React.SetStateAction<SimpleForm>>;
}) {
  return (
    <>
      {Object.entries(item).map(([key, value]) => {
        return (
          <td key={key}>
            <GenerateOnlyInput
              input={{
                inputType: defaultForm.items[0][key].inputType,
                // value: form.items[Number(numKey)][key as keyof Item],
                value: value as typeof value,
              }}
              referenceId={`items.${numKey}.${key}`}
              setFunction={(value) => {
                setForm((prev: SimpleForm) => {
                  const newItems = {
                    ...prev.items,
                    [numKey]: {
                      ...prev.items[Number(numKey)],
                      [key]: value as typeof value,
                    },
                  };
                  return { ...prev, items: newItems };
                });
              }}
            />
          </td>
        );
      })}
    </>
  );
}

// function DeleteButton({
//   numKey,
//   form,
//   setForm,
// }: {
//   numKey: string;
//   form: SimpleForm;
//   setForm: (form: SimpleForm) => void;
// }) {
//   return (
//     <button
//       onClick={() => {
//         const newItems = { ...form.items };
//         delete newItems[Number(numKey)];
//         setForm({ ...form, items: newItems });
//       }}
//     >
//       Delete
//     </button>
//   );
// }

export default function DisplayItems({
  items,
  // form,
  setForm,
}: {
  items: { [key: number]: Item };
  // form: SimpleForm;
  setForm: React.Dispatch<React.SetStateAction<SimpleForm>>;
}) {
  // TODO! check for items.length !== 0 before trying Object.entries(), otherwise everything fails.
  return (
    <table>
      <tbody>
        <tr>
          {Object.keys(items[0]).map((key) => {
            return <td key={key}>{toCapitalizedWords(key)}</td>;
          })}
        </tr>
        {Object.entries(items).map(([numKey, item]) => {
          return (
            <tr key={numKey}>
              {GenerateItemFields({ item, setForm, numKey })}
              {
                // delete button if not first item
                Number(numKey) !== 0 && (
                  <td>
                    <ItemDeleteButton
                      onClick={() => {
                        setForm((prev: SimpleForm) => {
                          const newItems = { ...prev.items };
                          delete newItems[Number(numKey)];
                          return { ...prev, items: newItems };
                        });
                      }}
                    >
                      &#10005;
                    </ItemDeleteButton>
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
