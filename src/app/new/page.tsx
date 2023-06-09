import InputForm from '~/components/InputForm';
import { SimpleForm, defaultForm, simplifyObjRec } from '~/types/form';

const simplifiedForm: SimpleForm = simplifyObjRec(defaultForm);

export default function Input() {
  return <InputForm simplifiedForm={simplifiedForm} />;
}
