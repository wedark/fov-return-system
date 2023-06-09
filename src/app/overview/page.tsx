import Link from 'next/link';
import { Fragment } from 'react';
import Manager from '~/components/Manager';
import { SimpleForm } from '~/types/form';
import { formsJsonFiles } from '~/utils/allForms';

export default function Overview() {
  console.log(formsJsonFiles);

  const headings = ['Customer number', 'Business name'];

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${headings.length}, 1fr)`,
  };

  return (
    // read all JSONs and show them
    // maybe update every 5 mins
    <div>
      <h1>Overview</h1>
      {/* <Manager /> */}
      <div>
        <div style={gridStyle}>
          {headings.map((heading) => (
            <div key={heading}>{heading}</div>
          ))}
        </div>
        {formsJsonFiles.map((formJsonFile) => {
          const obj = formJsonFile.imported as SimpleForm;

          const outputs = [obj.customerNumber, obj.customerDetails.businessName];

          return (
            <Link
              href={`/edit/${formJsonFile.filename}`}
              key={formJsonFile.filename}
              style={gridStyle}
            >
              {outputs.map((output) => (
                <div key={output}>{output}</div>
              ))}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
