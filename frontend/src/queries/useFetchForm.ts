import useSWR from 'swr';
import { fetcher } from './fetcher';

export function useFetchForm(id: string) {
  return useSWR(`http://localhost:8000/${id}`, fetcher);
}