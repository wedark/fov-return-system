type InputType = 'text' | 'number' | 'incremental' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'date';
type SectionType = 'mix' | 'items' | 'reasons' | 'agreements' | 'actions';

interface SimpleInput {
  inputType: InputType;
  value: string | number | boolean;
}

interface NamedInput extends SimpleInput {
  name: string;
}

type MixedSection = NamedInput[];

interface Combination {
  [key: string]: SimpleInput;
}

type ItemsSection = Combination[];

type ReasonsSection = Combination;

interface AgreementsSection {
  agreementsMade: string;
}

interface Action {
  used: boolean;
  performedBy: string;
  completed: string | boolean;
}

interface ActionsSection {
  [key: string]: Action;
}

interface FinalFormType {
  customerNumber: SimpleInput;
  customerDetails: MixedSection;
  address: MixedSection;
  internal: MixedSection;
  items: ItemsSection;
  reason: ReasonsSection;
  agreementsMade: AgreementsSection;
  actions: ActionsSection;
}


