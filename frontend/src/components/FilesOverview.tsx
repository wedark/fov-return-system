'use client';

import { SimpleForm } from '~/types/form';
// import { formsJsonFiles } from '~/utils/allForms';
import { ControlDiv, OverviewTableWrapper, StyledButton, StyledLink } from './FilesOverview.styles';
import { Fragment } from 'react';
import { useFetchFormsOfType } from '~/queries/useFetchFormsOfType';
const headings = ['Customer number', 'Business name'];

export default function FilesOverview() {
  const { data: formsJsonFilesActive } = useFetchFormsOfType('active');
  const { data: formsJsonFilesCompleted } = useFetchFormsOfType('completed');
  const formsJsonFiles = {
    active: formsJsonFilesActive,
    completed: formsJsonFilesCompleted,
  };

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
                folder={folder as 'active' | 'completed'}
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
  formsArray: ImportedFile[] | undefined;
  folder: 'active' | 'completed';
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
      {formsArray?.length && (
        <tbody>
          {formsArray.map((formJsonFile) => {
            const obj = formJsonFile.imported as SimpleForm;
            const outputs = [obj.customerNumber, obj.customerDetails.businessName];

            return (
              <TableRow
                folder={folder}
                formJsonFile={formJsonFile}
                outputs={outputs}
                key={formJsonFile.filename}
              />
            );
          })}
        </tbody>
      )}
    </table>
  );
}

function TableRow({
  folder,
  formJsonFile,
  outputs,
}: {
  folder: 'active' | 'completed';
  formJsonFile: ImportedFile;
  outputs: (string | number)[];
}) {
  // TODO use useSWRMutation (and optimistic UI)
  const { data, mutate } = useFetchFormsOfType(folder);

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
          onClick={async () => {
            const confirmation = confirm(
              `Are you sure you want to 𝗗𝗘𝗟𝗘𝗧𝗘 ${formJsonFile.filename}?`,
            );
            if (!confirmation) return;

            await fetch(`http://localhost:8000/${folder}/${formJsonFile.filename}`, {
              method: 'DELETE',
            });

            if (data === undefined) return;

            let newArray = [...data];
            const theElementIndex = newArray.findIndex(
              (importedFile) => importedFile.filename === formJsonFile.filename,
            );

            // @ts-expect-error
            newArray[theElementIndex] = undefined;
            newArray = newArray.filter(Boolean);

            mutate(newArray);
          }}
        >
          Delete
        </StyledButton>
      </td>
    </tr>
  );
}
