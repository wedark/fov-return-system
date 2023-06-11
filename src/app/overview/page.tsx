// import Link from 'next/link';
// import { Fragment } from 'react';
// import FileDeleteButton from '~/components/FileDeleteButton';
import FilesOverview from '~/components/FilesOverview';
// import Manager from '~/components/Manager';
// import { SimpleForm } from '~/types/form';
// import { formsJsonFiles } from '~/utils/allForms';

export default function Overview() {
  // console.log(formsJsonFiles);

  return (
    // read all JSONs and show them
    // maybe update every 5 mins
    <div>
      <h1>Overview</h1>
      <FilesOverview />
    </div>
  );
}
