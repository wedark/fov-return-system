'use client';
import { SWRProvider } from '~/app/swr-provider';
import InputForm from '~/components/InputForm';
import { useFetchForm } from '~/queries/useFetchForm';

export default function Edit({ params }: { params: { folder: string; filename: string } }) {
  const { data: imported } = useFetchForm(`${params.folder}/${params.filename}`);

  return (
    <SWRProvider>
      {imported && <InputForm simplifiedForm={imported} action="edit" folder={params.folder} />}
    </SWRProvider>
  );
}
