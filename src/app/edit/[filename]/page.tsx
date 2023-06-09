import InputForm from '~/components/InputForm';

export default async function Edit({ params }: { params: { filename: string } }) {
  // console.log(params.filename);

  // if file exists open it
  // if not create it

  const imported = await import(`../../../../files/${params.filename}`)
    .then(JSON.stringify)
    .then(JSON.parse);
  // .then(console.log);

  // console.log('imported:', imported);
  // console.log('🚀 ~ file: page.tsx:5 ~ Edit ~ imported:', imported);

  // console.log(require.resolve(`./files/${params.filename}`));

  return <InputForm simplifiedForm={imported} action="edit" />;
}
