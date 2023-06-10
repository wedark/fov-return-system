'use client';
import { useEffect, useState } from 'react';

import { SimpleForm } from '~/types/form';

import DynamicForm from './DynamicForm';
import PreviewForm from './FormPreview';
import {
  FormEditWrapper,
  FormEditorHeading,
  InputFormWrapper,
  PreviewWrapper,
  PrintModeSwitch,
} from './InputForm.styled';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InputForm({
  simplifiedForm,
  action,
}: {
  simplifiedForm: SimpleForm;
  action: 'new' | 'edit';
}) {
  const [form, setForm] = useState<SimpleForm>(simplifiedForm);

  const router = useRouter();

  useEffect(() => {
    const customerNumber = Number(location.search.split('?')[1]);
    if (customerNumber) {
      setForm((prev) => ({ ...prev, customerNumber }));
    }
  }, []);

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <PrintModeSwitch
          type="button"
          onClick={() => {
            const currentPrint = localStorage.getItem('print');
            const currentPrintAsBoolean = currentPrint ? currentPrint === 'true' : false;
            localStorage.setItem('print', String(!currentPrintAsBoolean));
            location.reload();
          }}
        >
          Switch print mode
        </PrintModeSwitch>
      )}
      {/* <Link
        href="/overview"
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
        onClick={(e) => {
          // check if the form has been changed
          // if so, ask if the user wants to save
          // if not, just go to the overview
          e.preventDefault();
          if (confirm('Do you want to save the form?')) {
            fetch('/manager', { method: 'POST', body: JSON.stringify(form) }).then((res) => {
              console.log(res);
              router.push('/overview');
            });
          } else {
            router.push('/overview');
          }
        }}
      >
        Overview
      </Link> */}
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
          <DynamicForm form={form} setForm={setForm} action={action} />
        </FormEditWrapper>
        <PreviewWrapper>
          <h2>Preview</h2>
          <PreviewForm form={form} />
          <button
            onClick={() => {
              // console.log(location.pathname.split('/')[1]);

              fetch(`/manager/${action}`, {
                method: 'POST',
                body: JSON.stringify(form),
              }).then((res) => {
                console.log(res);
                if (res.ok) {
                  router.push('/overview');
                } else {
                  alert(res.statusText);
                }
              });
            }}
          >
            Save
          </button>
        </PreviewWrapper>
      </InputFormWrapper>
    </>
  );
}

function typeSafeObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}
