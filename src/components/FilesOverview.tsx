'use client';
import Link from 'next/link';
import { SimpleForm } from '~/types/form';
import { formsJsonFiles } from '~/utils/allForms';
import FileDeleteButton from './FileDeleteButton';
import { useEffect, useState } from 'react';

const headings = ['Customer number', 'Business name'];

export default function FilesOverview() {
  const [newCustomerNumber, setNewCustomerNumber] = useState<number | null>(null);

  useEffect(() => {
    const formsLength = formsJsonFiles.length;
    let notUsedCustomerNumber = formsLength;
    if (formsLength) {
      while (
        formsJsonFiles.some(
          (form) => Number(form.imported.customerNumber) === notUsedCustomerNumber,
        )
      ) {
        notUsedCustomerNumber++;
      }
    }
    setNewCustomerNumber(notUsedCustomerNumber);
  }, []);

  return (
    <div>
      <table style={{ width: '80%' }}>
        <thead>
          <tr>
            {headings.map((heading) => (
              <th
                key={heading}
                style={{
                  textAlign: 'left',
                }}
              >
                {heading}
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
                    <Link
                      href={`/edit/${formJsonFile.filename}`}
                      key={formJsonFile.filename}
                      style={{ width: '100%' }}
                    >
                      {output}
                    </Link>
                  </td>
                ))}
                <td>
                  <button
                    onClick={() => {
                      // console.log('delete', '${formJsonFile.filename}');
                      fetch(`/manager/delete?filename=${formJsonFile.filename}`, {
                        body: JSON.stringify({ filename: formJsonFile.filename }),
                        method: 'DELETE',
                      });
                    }}
                  >
                    Delete
                  </button>
                  {/* <FileDeleteButton /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link
        href={`/new?${newCustomerNumber || ''}`}
        onClick={() => {
          // console.log('new return form');
        }}
      >
        New return form
      </Link>
    </div>
  );
}
