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

  planMainId: {
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
      minLength: 3,
      maxLength: 100,
    },
  },

  alternativeNames: {
    type: 'text',
    label: t('project.alternative_names'),
    placeholder: t('project.alternative_names.placeholder'),
    validation: {
      type: 'string',
    },
  },

  description: {
    type: 'textarea',
    label: t('project.description'),
    validation: {
      maxLength: 1024,
    },
  },
};

export default fields;
