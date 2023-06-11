'use client';
import Link from 'next/link';
import { SimpleForm } from '~/types/form';
import { formsJsonFiles } from '~/utils/allForms';
import {
  ControlDiv,
  FormOverviewWrapper,
  OverviewTableWrapper,
  StyledButton,
  StyledLink,
} from './FilesOverview.styles';

const headings = ['Customer number', 'Business name'];

export default function FilesOverview() {
  return (
    <FormOverviewWrapper>
      <h1>Overview</h1>
      <ControlDiv>
        <StyledLink href={`/new`} textSize="1.25rem" outlined>
          New return form
        </StyledLink>
      </ControlDiv>
      <OverviewTableWrapper>
        <h2>Table of returns</h2>
        <table>
          <thead>
            <tr>
              {headings.map((heading) => (
                <th
                  key={heading}
                  style={{
                    textAlign: 'left',
                  }}
                >
                  <span>{heading}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formsJsonFiles.map((formJsonFile) => {
              const obj = formJsonFile.imported as SimpleForm;
              const outputs = [obj.customerNumber, obj.customerDetails.businessName];

              return (
                <tr key={formJsonFile.filename}>
                  {outputs.map((output) => (
                    <td key={output}>
                      <StyledLink
                        href={`/edit/${formJsonFile.filename}`}
                        key={formJsonFile.filename}
                        style={{ width: '100%' }}
                      >
                        {output}
                      </StyledLink>
                    </td>
                  ))}
                  <td>
                    <StyledButton
                      onClick={() => {
                        fetch(`/manager/delete?filename=${formJsonFile.filename}`, {
                          body: JSON.stringify({ filename: formJsonFile.filename }),
                          method: 'DELETE',
                        });
                      }}
                    >
                      Delete
                    </StyledButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </OverviewTableWrapper>
    </FormOverviewWrapper>
  );
}
