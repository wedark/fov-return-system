import useSWR from 'swr';
import { fetcher } from './fetcher';
import { SimpleForm } from '~/types/form';

export function useFetchFormsOfType(type: 'active' | 'completed') {
  return useSWR<{
    filename: string;
    imported: SimpleForm;
  }[]>(`http://localhost:8000/${type}`, fetcher);
}
