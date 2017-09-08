import t from '../locale';
import { stringToList, toNumber } from '../forms/normalizers';

const fields = {
  hansuProjectId: {
    type: 'text',
    label: t('project.hansuProjectId'),
    validation: {
      required: true,
      type: 'string',
    },
  },

  mainNo: {
    type: 'text',
    label: t('plan.primary_id'),
    normalize: toNumber,
    validation: {
      required: true,
      type: 'number',
    },
  },

  name: {
    type: 'text',
    label: t('project.name'),
    validation: {
      type: 'string',
      required: true,
    },
  },

  alternativeNames: {
    type: 'text',
    label: t('project.alternative_names'),
    normalize: stringToList,
    format: value => (value || []).join(', '),
    validation: {
      type: 'array',
    },
  },

  description: {
    type: 'textarea',
    label: t('project.description'),
  },
};

export default fields;
