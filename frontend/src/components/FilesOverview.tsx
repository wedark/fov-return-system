'use client';
import Link from 'next/link';
import { SimpleForm } from '~/types/form';
import { formsJsonFiles } from '~/utils/allForms';
import { ControlDiv, OverviewTableWrapper, StyledButton, StyledLink } from './FilesOverview.styles';
import { Fragment } from 'react';
const headings = ['Customer number', 'Business name'];

export default function FilesOverview() {
  return (
    <main>
      <h1>Overview</h1>
      <ControlDiv>
        <StyledLink href={`/new`} textsize="1.25rem" outlined="true">
          New return form
        </StyledLink>
      </ControlDiv>
      <OverviewTableWrapper>
        {Object.keys(formsJsonFiles).map((folder) => {
          return (
            <Fragment key={folder}>
              <h2>{folder}</h2>
              <GenerateOverviewTable
                formsArray={formsJsonFiles[folder as keyof typeof formsJsonFiles]}
                folder={folder}
              />
            </Fragment>
          );
        })}
      </OverviewTableWrapper>
    </main>
  );
}

interface ImportedFile {
  filename: string;
  imported: SimpleForm;
}
function GenerateOverviewTable({
  formsArray,
  folder,
}: {
  formsArray: ImportedFile[];
  folder: string;
}) {
  return (
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
        {formsArray.map((formJsonFile) => {
          const obj = formJsonFile.imported as SimpleForm;
          const outputs = [obj.customerNumber, obj.customerDetails.businessName];

          return (
            <tr key={formJsonFile.filename}>
              {outputs.map((output) => (
                <td key={output}>
                  <StyledLink
                    href={`/edit/${folder}/${formJsonFile.filename}`}
                    key={formJsonFile.filename}
                    style={{ width: '100%' }}
                  >
                    {output}
                  </StyledLink>
                </td>
              ))}
              <td
                style={{
                  border: 'none',
                  width: '5%',
                }}
              >
                <StyledButton
                  onClick={() => {
                    fetch(`/manager/delete?filename=${formJsonFile.filename}?${folder}`, {
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
  );
}
