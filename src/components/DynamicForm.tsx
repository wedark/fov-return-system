import { defaultForm } from '~/types/form';
import { GenerateInputField, GenerateOnlyInput } from './InputGenerators';
import DisplayActions from './sections/DisplayActions';

import type { SimpleForm } from '~/types/form';
import DisplayItems from './sections/DisplayItems';
import GenerateSection from './sections/GenerateSection';
import {
  FormEditContainer,
  DoubleSection,
  SingleSection,
  ItemsWrapper,
  ReasonsWrapper,
  AgreementsWrapper,
  ActionsWrapper,
} from './DynamiсForm.styled';
import { StyledButton } from './FilesOverview.styles';
import { ValidationError } from '~/utils/formCheck';

export default function DynamicForm({
  form,
  setForm,
  action,
  validationErrors,
}: {
  form: SimpleForm;
  setForm: React.Dispatch<React.SetStateAction<SimpleForm>>;
  action: string;
  validationErrors: ValidationError[];
}) {
  return <DisplayForm form={form} setForm={setForm} action={action} />;
}

// use sectionNames to generate form
function DisplayForm({
  form,
  setForm,
  action,
}: {
  form: SimpleForm;
  setForm: React.Dispatch<React.SetStateAction<SimpleForm>>;
  action: string;
}) {
  return (
    <FormEditContainer>
      {/* Customer Number */}
      {action === 'new' ? (
        <GenerateInputField
          name="customerNumber"
          referenceId="customerNumber"
          input={{
            inputType: defaultForm.customerNumber.inputType,
            value: form.customerNumber,
          }}
          setFunction={(value) => {
            setForm({ ...form, customerNumber: value as typeof form.customerNumber });
          }}
        />
      ) : (
        <span>Customer Number: {form.customerNumber}</span>
      )}
      <DoubleSection>
        <div>
          <h3>Customer Information</h3>
          {GenerateSection({ section: 'customerDetails', form, setForm })}
        </div>
        <div>
          <h3>Address</h3>
          {GenerateSection({ section: 'address', form, setForm })}
        </div>
      </DoubleSection>
      <SingleSection>
        <h3>Internal</h3>
        <div>{GenerateSection({ section: 'internal', form, setForm })}</div>
      </SingleSection>
      <ItemsWrapper>
        <h3>Items</h3>
        {DisplayItems({ items: form.items, setForm })}
        <StyledButton
          backcolor="lime"
          textcolor="black"
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
        </StyledButton>
      </ItemsWrapper>

      <ReasonsWrapper>
        <h3>Reasons</h3>
        <div>
          <div>
            <GenerateOnlyInput
              input={{
                inputType: defaultForm.reasons.textReasons.inputType,
                value: form.reasons.textReasons,
              }}
              referenceId="reasons.textReasons"
              setFunction={(value) => {
                setForm({
                  ...form,
                  reasons: {
                    ...form.reasons,
                    textReasons: value as typeof form.reasons.textReasons,
                  },
                });
              }}
            />
          </div>
          <div>{GenerateSection({ section: 'reasons', form, setForm })}</div>
        </div>
      </ReasonsWrapper>
      <AgreementsWrapper>
        <h3>Agreements</h3>
        {GenerateOnlyInput({
          input: {
            inputType: defaultForm.agreements.text.inputType,
            value: form.agreements.text,
          },
          referenceId: 'agreements.text',
          setFunction: (value) => {
            setForm({
              ...form,
              agreements: { ...form.agreements, text: value as typeof form.agreements.text },
            });
          },
        })}
      </AgreementsWrapper>
      <ActionsWrapper>
        <h3>Actions</h3>
        <div>
          <DisplayActions actions={form.actions} form={form} setForm={setForm} />
        </div>
      </ActionsWrapper>
    </FormEditContainer>
  );
}
