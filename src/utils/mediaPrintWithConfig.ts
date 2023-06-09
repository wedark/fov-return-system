import { RuleSet, css } from 'styled-components';

import { settings } from '~/config/print';

export function mediaPrintWithConfig(style: RuleSet) {
  // console.log('setting in mediaPrintWithConfig', settings.appearAsMediaPrint);
  return css`
    @media print {
      ${style}
    }
    ${settings.appearAsMediaPrint && style}
  `;
}
