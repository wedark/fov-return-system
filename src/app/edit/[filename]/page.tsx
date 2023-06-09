import InputForm from '~/components/InputForm';

export default async function Edit({ params }: { params: { filename: string } }) {
  console.log(params.filename);

  const imported = await import('../../../../files/order.json')
    .then(JSON.stringify)
    .then(JSON.parse);
  // .then(console.log);

  console.log('imported:', imported);
  // console.log('🚀 ~ file: page.tsx:5 ~ Edit ~ imported:', imported);

  // console.log(require.resolve(`./files/${params.filename}`));

  return <InputForm simplifiedForm={imported} />;
}
