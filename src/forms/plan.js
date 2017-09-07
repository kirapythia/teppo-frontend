import t from '../locale';
import { toNumber } from './normalizers';

const fields = {
  mainNo: {
    type: 'text',
    label: t('plan.primary_id'),
    normalize: toNumber,
    validation: {
      required: true,
      type: 'number',
    },
  },

  subNo: {
    type: 'text',
    label: t('plan.secondary_id'),
    normalize: toNumber,
    validation: {
      required: true,
      type: 'number',
    },
  },
};

export default fields;
