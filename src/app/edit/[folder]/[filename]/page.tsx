import InputForm from '~/components/InputForm';

export default async function Edit({ params }: { params: { folder: string; filename: string } }) {
  // if not - create file
  const imported = await import(`../../../../../files/${params.folder}/${params.filename}`)
    .then(JSON.stringify)
    .then(JSON.parse);
  // .then(console.log);

  // console.log('imported:', imported);
  // console.log('🚀 ~ file: page.tsx:5 ~ Edit ~ imported:', imported);

  // console.log(require.resolve(`./files/${params.filename}`));
  return <InputForm simplifiedForm={imported} action="edit" folder={params.folder} />;
}
