import FilesOverview from '~/components/FilesOverview';
import { SWRProvider } from '../swr-provider';

export default function Overview() {
  return (
    <SWRProvider>
      <FilesOverview />;
    </SWRProvider>
  );
}
