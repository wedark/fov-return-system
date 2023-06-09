import { SimpleInput } from '~/types/form';
import { toCapitalizedWords } from '~/utils/toCapitalizedWords';

export function GenerateInputField({
  name,
  input,
  setFunction,
}: {
  name: string;
  input: SimpleInput;
  setFunction: (value: typeof input.value) => void;
}) {
  return (
    <div
    // style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '0.5em' }}
    >
      <span>{toCapitalizedWords(name)}</span>
      <GenerateOnlyInput input={input} setFunction={setFunction} />
    </div>
  );
}

export function GenerateOnlyInput({
  input,
  setFunction,
}: {
  input: SimpleInput;
  setFunction: (value: typeof input.value) => void;
}) {
  const inputType = input.inputType;

  return inputType === 'textarea' ? (
    <textarea
      value={input.value as string}
      onChange={(e) => {
        setFunction(e.target.value);
      }}
    />
  ) : (
    <input
      type={inputType === 'incremental' ? 'number' : inputType}
      value={
        inputType === 'checkbox'
          ? undefined
          : inputType === 'incremental' || inputType === 'number'
          ? (input.value as number)
          : (input.value as string)
      }
      checked={inputType === 'checkbox' ? (input.value as boolean) : undefined}
      onChange={(e) => {
        setFunction(e.target[inputType === 'checkbox' ? 'checked' : 'value']);
      }}
      className={inputType === 'incremental' ? 'input-incremental' : ''}
    />
  );
}
