import { RuleSet, css } from 'styled-components';

import { appearAsMediaPrint } from '~/config/print';

export function mediaPrintWithConfig(style: RuleSet) {
  return css`
    @media print {
      ${style}
    }
    ${appearAsMediaPrint && style}
  `;
}
