'use client';
import { SWRConfig } from 'swr';
import { localStorageProvider } from '~/queries/localStorageProvider';

export const SWRProvider = ({ children }: React.PropsWithChildren) => {
  return <SWRConfig value={{ provider: localStorageProvider }}>{children}</SWRConfig>;
};
