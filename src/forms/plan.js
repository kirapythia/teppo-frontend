import t from '../locale';

/**
 * Field definitions for the plan form. Object key is field name and
 * id value is an object containing all field definitions
 * @namespace fields
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

  url: {
    type: 'file',
    label: t('plan.file'),
    placeholder: t('dropzone.placeholder'),
  },
};

export default fields;
