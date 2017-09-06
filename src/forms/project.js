import t from '../locale';

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
    label: t('project.plan_primary_id'),
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
    validation: {
      type: 'string',
    },
  },

  description: {
    type: 'textarea',
    label: t('project.description'),
  },
};

export default fields;
