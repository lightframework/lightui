import HostCreate from './_components/host-create';
import HostCreateFormProvider from './_components/host-create-form-provider';

export default function CreateHosts() {
  return (
    <HostCreateFormProvider key="host-create">
      <HostCreate />
    </HostCreateFormProvider>
  );
}
