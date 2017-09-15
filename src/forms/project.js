import t from '../locale';
import { stringToList } from '../forms/normalizers';

/**
 * Field definitions for the project form. Object key is field name and
 * id value is an object containing all field definitions
 * @namespace
 * @property {string} type Field input type
 * @property {string} label Field label text
 * @property {string} placeholder Field placeholder text
 * @property {function} format Field value formatter @see https://redux-form.com/7.0.4/docs/api/field.md/
 * @property {function} normalize Field value normalizer @see https://redux-form.com/7.0.4/docs/api/field.md/
 * @property {object} validation Field validation rules with rule name as key
 *                               and rule value as value. For example:
 *                               "type": "number" validation will return an error if
 *                               the value given cannot be converted to a number
 */
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

/*   alternativeNames: {
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
  }, */
};

export default fields;
