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
  LinkBack,
  PreviewWrapper,
  PrintModeSwitch,
} from './InputForm.styled';
import { useRouter } from 'next/navigation';
import { StyledButton } from './FilesOverview.styles';

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

  useEffect(() => {
    validationErrors.forEach((error) => {
      const field = error.referenceId;
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
    // focus on first error

    const firstErrorElement = document.getElementById(validationErrors[0]?.referenceId);
    if (firstErrorElement) firstErrorElement.focus();
    return () => {
      validationErrors.forEach((error) => {
        const field = error.referenceId;
        const element = document.getElementById(field);
        if (element) {
          element.classList.remove('highlight');
        }
      });
    };
  }, [validationErrors]);

  const router = useRouter();

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <PrintModeSwitch
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
          }}
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

      <LinkBack
        outlined="true"
        textsize="0.9rem"
        href="/overview"
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
      >
        Back to overview
      </LinkBack>
      <FormEditorHeading>Form Editor</FormEditorHeading>
      <InputFormWrapper>
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
          <StyledButton
            backcolor="lime"
            textcolor="black"
            onClick={() => {
              fetch(`http://localhost:8000/${action === 'new' ? '' : `${folder || ''}`}`, {
                method: action === 'new' ? 'POST' : 'PUT',
                body: JSON.stringify(form),
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then((res) => {
                if (res.ok) {
                  router.push('/overview');
                } else if (res.status === 400) {
                  res.json().then((res) => {
                    setValidationErrors(res.message);
                  });
                } else {
                  alert(res.statusText);
                }
              });
            }}
          >
            Save
          </StyledButton>
        </PreviewWrapper>
      </InputFormWrapper>
    </>
  );
}
