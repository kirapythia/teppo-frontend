import t from '../locale';

const fields = {
  mainNo: {
    type: 'text',
    label: t('plan.primary_id'),
    validation: {
      required: true,
      type: 'number',
    },
  },

  subNo: {
    type: 'text',
    label: t('plan.secondary_id'),
    validation: {
      required: true,
      type: 'number',
    },
  },
};

export default fields;
