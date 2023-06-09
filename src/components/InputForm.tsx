'use client';
import { useState } from 'react';

import { SimpleForm } from '~/types/form';

import DynamicForm from './DynamicForm';
import PreviewForm from './FormPreview';
import {
  FormEditWrapper,
  FormEditorHeading,
  InputFormWrapper,
  PreviewWrapper,
} from './InputForm.styled';

export default function InputForm({ simplifiedForm }: { simplifiedForm: SimpleForm }) {
  const [form, setForm] = useState<SimpleForm>(simplifiedForm);

  // get form from manager

  // generate form to display
  return (
    <>
      <FormEditorHeading>Form Editor</FormEditorHeading>
      <InputFormWrapper>
        {/* <div>
          <h2>Default</h2>
          <textarea value={JSON.stringify(defaultForm, null, 2)} readOnly />
        </div> */}
        {/* <div>
          <h2>Simplified</h2>
          <textarea value={JSON.stringify(simplifiedForm, null, 2)} readOnly />
        </div> */}

        <FormEditWrapper>
          <h2>Form Editor</h2>
          <DynamicForm form={form} setForm={setForm} />
        </FormEditWrapper>
        <PreviewWrapper>
          <h2>Preview</h2>
          <PreviewForm form={form} />
        </PreviewWrapper>
        {/* <h1>Creating a new file</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          await fetch('/manager', { method: 'POST', body: JSON.stringify(form) });
        }}
      >
        <button type="submit">Save</button>
      </form> */}
      </InputFormWrapper>
    </>
  );
}

function typeSafeObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}
