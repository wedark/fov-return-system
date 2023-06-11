'use client';
import { useEffect, useState } from 'react';

import { SimpleForm } from '~/types/form';
import type { ValidationError } from '~/utils/formCheck';
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
  folder,
}: {
  simplifiedForm: SimpleForm;
  action: 'new' | 'edit';
  folder?: string;
}) {
  const [form, setForm] = useState<SimpleForm>(simplifiedForm);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // when form is changed remove all validation errors

  useEffect(() => {
    // const fields = validationErrors.map((error) => {

    // }
    validationErrors.forEach((error) => {
      const field = error.referenceId;
      console.log('add highlight', field);
      const element = document.getElementById(field);
      if (element) {
        element.classList.add('highlight');
        const errorElement = document.createElement('span');
        errorElement.classList.add('error');
        errorElement.id = `${field}-error`;
        errorElement.innerText = error.message;
        element.parentElement?.insertBefore(errorElement, element.nextSibling);
      }
    });

    return () => {
      validationErrors.forEach((error) => {
        const field = error.referenceId;
        console.log('remove highlight', field);
        const element = document.getElementById(field);
        if (element) {
          element.classList.remove('highlight');
        }
      });
    };
  }, [validationErrors]);

  // handle the fields that are highlighted and unhighlighte them when they are changed
  // useEffect(() => {
  //   const fields = highlightedFields.filter((field) => {

  //   }, [form]);

  const router = useRouter();

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
          <DynamicForm
            form={form}
            setForm={setForm}
            action={action}
            validationErrors={validationErrors}
          />
        </FormEditWrapper>
        <PreviewWrapper>
          <h2>Preview</h2>
          <PreviewForm form={form} />
          <button
            onClick={() => {
              // console.log(location.pathname.split('/')[1]);
              console.log(form);
              // get everything after ? in the url
              fetch(`/manager/${action}?${folder || ''}`, {
                method: 'POST',
                body: JSON.stringify(form),
              }).then((res) => {
                if (res.ok) {
                  console.log(res);
                  router.push('/overview');
                } else if (res.status === 400) {
                  res.json().then((res) => {
                    setValidationErrors(res);
                  });
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
