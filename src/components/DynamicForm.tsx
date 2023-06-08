'use client';

import { useState, useRef, useEffect } from 'react';
import { defaultForm, simplifyObjRec } from '~/types/form';
import { PreviewWrapper } from './DynamixForm.styled';

export default function DynamicForm() {
  const simplifiedForm = simplifyObjRec(defaultForm);

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
          <textarea>{JSON.stringify(simplifiedForm, null, 2)}</textarea>
        </div>
      </PreviewWrapper>
    </>
  );
}
