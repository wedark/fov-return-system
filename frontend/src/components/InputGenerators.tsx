import { SimpleInput } from '~/types/form';
import { toCapitalizedWords } from '~/utils/toCapitalizedWords';
import { LabeledInput, StyledInput } from './DynamiсForm.styled';

export function GenerateInputField({
  name,
  referenceId,
  input,
  setFunction,
  ...props
}: {
  name: string;
  referenceId: string;
  input: SimpleInput;
  setFunction: (value: typeof input.value) => void;
  props?: React.HTMLAttributes<HTMLInputElement> | React.HTMLAttributes<HTMLTextAreaElement>;
}) {
  return (
    <LabeledInput>
      <span>{toCapitalizedWords(name)}</span>
      <GenerateOnlyInput
        input={input}
        setFunction={setFunction}
        referenceId={referenceId}
        {...props}
      />
    </LabeledInput>
  );
}

export function GenerateOnlyInput({
  input,
  referenceId,
  setFunction,
  ...props
}: {
  input: SimpleInput;
  referenceId: string;
  setFunction: (value: typeof input.value) => void;
  props?: React.HTMLAttributes<HTMLInputElement> | React.HTMLAttributes<HTMLTextAreaElement>;
}) {
  const inputType = input.inputType;

  return inputType === 'textarea' ? (
    <textarea
      value={input.value as string}
      onChange={(e) => {
        setFunction(e.target.value);
      }}
      {...props}
    />
  ) : (
    <StyledInput
      type={inputType === 'incremental' ? 'number' : inputType === 'shortText' ? 'text' : inputType}
      value={
        inputType === 'checkbox'
          ? undefined
          : inputType === 'incremental' || inputType === 'number'
          ? (input.value as number)
          : (input.value as string)
      }
      id={referenceId}
      checked={inputType === 'checkbox' ? (input.value as boolean) : undefined}
      onChange={(e) => {
        const setVal = inputType === 'checkbox' ? e.target.checked : e.target.value;
        // ? If the value is supposed to be a number, then convert it to a number
        // ? However also allow the value to be an empty string (To erase the 0 at first)
        const checkedVal =
          inputType === 'number' || inputType === 'incremental'
            ? setVal
              ? Number(setVal)
              : ''
            : setVal;
        setFunction(checkedVal as typeof input.value);

        const el = document.getElementById(referenceId);
        const errorSpan = document.getElementById(`${referenceId}-error`);
        if (el) {
          el.classList.remove('highlight');
        }

        if (errorSpan) {
          errorSpan.remove();
        }
      }}
      className={inputType === 'incremental' ? 'input-incremental' : ''}
      // if shortText width 5em
      style={inputType === 'shortText' ? { width: '5em' } : {}}
      {...props}
    />
  );
}
