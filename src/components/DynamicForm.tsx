'use client';

import { useState, useRef, useEffect } from 'react';
import { defaultForm, simplifyObjRec } from '~/types/form';
import { PreviewWrapper } from './DynamiсForm.styled';

export default function DynamicForm() {
  const simplifiedForm = simplifyObjRec(defaultForm);
  const [form, setForm] = useState(simplifiedForm);

  const previewPRef = useRef<HTMLParagraphElement>(null);

  // <span>Customer Number: {form.customerNumber}</span>
  // <h3>Customer Data</h3>
  // <span>Business Name: {form.customerDetails.businessName}</span>

  useEffect(() => {
    if (previewPRef.current) {
      previewPRef.current.innerHTML = `
        <span>Customer Number: ${form.customerNumber}</span>
        <h3>Customer Data</h3>
        <span>Business Name: ${form.customerDetails.businessName}</span>
        <span>Contact: ${form.customerDetails.contact}</span>
        <h3>Address</h3>
        <span>Street: ${form.address.street}</span>
        <span>Postal Code: ${form.address.postalCode}</span>
        <h3>Internal</h3>
        <span>Handler FOV: ${form.internal.handlerFov}</span>
        <span>Order Number: ${form.internal.orderNumber}</span>
        <span>Form date: ${form.internal.formDate}</span>
      `;
    }
  }, [form]);

  return (
    <>
      <h1>Dynamic Form</h1>
      <PreviewWrapper>
        <div>
          <h4>Default</h4>
          <textarea>{JSON.stringify(defaultForm, null, 2)}</textarea>
        </div>
        <div>
          <h4>Simplified</h4>
          <textarea>{JSON.stringify(form, null, 2)}</textarea>
        </div>
        <div>
          <h4>Preview</h4>
          <p
            ref={previewPRef}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              outline: '1px solid black',
            }}
          ></p>
        </div>
      </PreviewWrapper>
    </>
  );
}
