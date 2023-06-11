import InputForm from '~/components/InputForm';
// edit/[folder]/[filename]/page.tsx
// we need both folder and filename
export default async function Edit({ params }: { params: { folder: string; filename: string } }) {
  // console.log(params.filename);

  // if file exists open it
  // if not create it

  // get url
  console.log('params', params);
  const imported = await import(`../../../../../files/${params.folder}/${params.filename}`)
    .then(JSON.stringify)
    .then(JSON.parse);
  // .then(console.log);

  // console.log('imported:', imported);
  // console.log('🚀 ~ file: page.tsx:5 ~ Edit ~ imported:', imported);

  // console.log(require.resolve(`./files/${params.filename}`));
  return <InputForm simplifiedForm={imported} action="edit" folder={params.folder} />;
}
