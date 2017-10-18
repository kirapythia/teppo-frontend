import * as R from 'ramda';
import { ServerResponseError } from '../../utils/ajax';
import t from '../../locale';
import * as model from './model';

describe('Saving plans', () => {
  describe('saving without files', () => {
    it('should return a promise', () => {
      fetch.mockResponseOnce('{}', { ok: true, status: 200 });
      return model.savePlans({ projectId: 1 });
    });

    it('should resolve promise with server response wrapped in an array of succeeded', () => {
      const plan = {};
      fetch.mockResponseOnce('{}', { ok: true, status: 200 });
      return model.savePlans({ projectId: 1 })
        .then(result => expect(result[0][0]).toEqual(plan));
    });

    it('should reject if values does not include projectId', () => model.savePlans({})
      .catch(e => expect(e.message).toEqual('InvalidArgumentsException: ProjectId is missing or invalid!'))
    );

    it('should reject with an ServerResponseError when plan save fails', () => {
      fetch.mockResponseOnce('{}', { ok: false, status: 400 });
      return model.savePlans({ projectId: 1 })
        .catch(e => expect(e instanceof ServerResponseError).toEqual(true));
    });
  });

  describe('saving with a file', () => {
    it('should resolve promise with plan when both the plan and file upload succeeds', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ }] };

      fetch.resetMocks();
      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
      fetch.mockResponseOnce('{}', { ok: true, status: 200 });

      const result = await model.savePlans(plan);
      expect(result instanceof Error).toBe(false);
    });

    it('should resolve with a plan object with file url in the succeeded basket', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ name: 'fileName' }] };
      const url = 'http://www.file.com/file';

      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
      fetch.mockResponseOnce(url, { ok: true, status: 200 });

      const result = await model.savePlans(plan);
      expect(result[0][0]).toEqual({ ...R.omit('files', plan), url });
    });

    it('should reject with a plan object with file url in the succeeded basket', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ name: 'fileName' }] };
      const url = 'http://www.file.com/file';

      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
      fetch.mockResponseOnce(url, { ok: true, status: 200 });

      const result = await model.savePlans(plan);
      expect(result[0][0]).toEqual({ ...R.omit('files', plan), url });
    });

    it('should parse plan properties from filename', async () => {
      const filename = '6001_281.dwg';
      const plan = { projectId: 1, planId: 2, files: [{ name: filename }] };
      const url = 'http://www.file.com/file';

      fetch.resetMocks();
      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
      fetch.mockResponseOnce(url, { ok: true, status: 200 });

      await model.savePlans(plan);
      const saveCall = fetch.mock.calls[0];
      const body = JSON.parse(saveCall[1].body);
      expect(body.mainNo).toEqual('6001');
      expect(body.subNo).toEqual('281');
    });

    it('should use values from the plan form if values cannot be derived from the filename', async () => {
      const filename = 'xxxx_xxx.dwg';
      const plan = { projectId: 1, planId: 2, mainNo: '1245', subNo: '201', files: [{ name: filename }] };
      const url = 'http://www.file.com/file';

      fetch.resetMocks();
      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
      fetch.mockResponseOnce(url, { ok: true, status: 200 });

      await model.savePlans(plan);
      const saveCall = fetch.mock.calls[0];
      const body = JSON.parse(saveCall[1].body);
      expect(body.mainNo).toEqual(plan.mainNo);
      expect(body.subNo).toEqual(plan.subNo);
    });

    it('should reject when saveResponse when save fails', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ }] };
      fetch.mockResponseOnce(undefined, { ok: false, status: 400 });

      try {
        await model.savePlans(plan);
      } catch (e) {
        expect(e instanceof Error).toBe(true);
      }
    });

    it('should reject if plan save fails', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ }] };
      fetch.mockResponseOnce(undefined, { ok: false, status: 400 });

      try {
        await model.savePlans(plan);
      } catch (e) {
        expect(e.message).toBe(t('network.error.plan.create'));
      }
    });

    it('should reject if file upload fails', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ name: 'fileName' }] };

      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
      fetch.mockResponseOnce('{}', { ok: false, status: 400 });

      try {
        await model.savePlans(plan);
      } catch (e) {
        expect(e.message).toBe(t('network.error.plan.create'));
      }
    });

    it('should not call file upload if save plan files', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ name: 'fileName' }] };

      fetch.resetMocks();
      const mock = fetch.mockResponseOnce('{}', { ok: false, status: 400 });

      try {
        await model.savePlans(plan);
      } catch (e) {
        expect(mock).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('Saving multiple plans and files', () => {
    it('should save as many plans as there are files', async () => {
      const files = [{}, {}, {}];
      const plan = { projectId: 1, planId: 2, files };

      fetch.resetMocks();
      const mockFn = fetch.mockResponse(JSON.stringify(plan), { ok: true, status: 200 });
      await model.savePlans(plan);
      expect(mockFn).toHaveBeenCalledTimes(files.length * 2);
    });

    it('should resolve if there is at least one successfull upload', async () => {
      const files = [{}, {}];
      const plan = { projectId: 1, planId: 2, files };

      fetch.resetMocks();

      // first plan save and file upload succeeds
      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });


      // third plan save fails
      fetch.mockResponseOnce('{}', { ok: false, status: 500 });
      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });

      try {
        const result = await model.savePlans(plan);
        expect(result.length).toBe(2);
      } catch (e) {
        throw new Error('Not supposed to be here!');
      }
    });
  });
});

describe('Validating plans', () => {
  it('should pass if the project has no plans', () => {
    expect(model.validatePlans([])({})).toEqual();
  });

  it('should pass if there are no files and no plan form values', () => {
    const plans = [{ projectId: 1, mainNo: 2, subNo: 3 }];
    const values = {};
    expect(model.validatePlans(plans)(values)).toEqual();
  });

  it('should pass if project has no plans with the same identifier combination', () => {
    const plans = [{ projectId: 1, mainNo: 2, subNo: 3 }];
    const values = { projectId: 1, mainNo: 3, subNo: 4 };
    expect(model.validatePlans(plans)(values)).toEqual();
  });

  it('should not pass if project already has a plan with the same main and sub number combination', () => {
    const plans = [{ projectId: 1, mainNo: 2, subNo: 3 }];
    const values = { projectId: 1, mainNo: 2, subNo: 3 };
    const errors = model.validatePlans(plans)(values);
    expect(errors.subNo).toEqual(t('validation.message.collides_existing_plan_values'));
  });

  it('should not pass if a file name is parsed to existing plan identifier values', () => {
    const plans = [{ projectId: 1, mainNo: 2001, subNo: 123 }];
    const values = { projectId: 1, files: [{ name: '2001_123.dwg' }] };
    const errors = model.validatePlans(plans)(values);
    expect(errors.files).toEqual(t('validation.message.double_plan_values'));
  });

  it('should not pass if files list have values that are parsed to doubles', () => {
    const plans = [];
    const values = { projectId: 1, files: [{ name: '2001_123.dwg' }, { name: '123_2001.dwg' }] };
    const errors = model.validatePlans(plans)(values);
    expect(errors.files).toEqual(t('validation.message.double_plan_values'));
  });
});

describe('Validating that created plan has equal identifiers', () => {
  it('should pass if all identifiers are equal to plan\'s', () => {
    const plan = { projectId: 1, mainNo: 2, subNo: 3 };
    const values = { projectId: 1, mainNo: 2, subNo: 3 };
    expect(model.validateSameIdentifiers(plan)(values)).toEqual();
  });

  it('should not pass if all identifiers are not equal to plan\'s', () => {
    const plan = { projectId: 1, mainNo: 2, subNo: 3, url: null };
    const values = { projectId: 1, mainNo: 3, subNo: 4, files: [] };
    const errors = model.validateSameIdentifiers(plan)(values);
    expect(errors.subNo).not.toEqual();
  });

  it('should not pass if identifiers derived from plan url are not equal to identifiers derived from uploaded file', () => {
    const plan = { projectId: 1, mainNo: 2, subNo: 3, url: 'https://file-server/2017_654.dwg' };
    const values = { projectId: 1, mainNo: 2, subNo: 3, files: [{ name: '2018_111.dwg' }] };
    const errors = model.validateSameIdentifiers(plan)(values);
    expect(errors.files).not.toEqual();
  });

  it('should pass if file identifiers but form identifiers do not', () => {
    const plan = { projectId: 1, mainNo: 2, subNo: 3, url: 'https://file-server/2017_654.dwg' };
    const values = { projectId: 1, mainNo: 3, subNo: 3, files: [{ name: '2017_654.dwg' }] };
    const errors = model.validateSameIdentifiers(plan)(values);
    expect(errors).toEqual();
  });

  it('should not pass if file with different identifiers is added when url is null', () => {
    const plan = { projectId: 1, mainNo: 2017, subNo: 654, url: null };
    const values = { projectId: 1, files: [{ name: '2017_654.dwg' }] };
    const errors = model.validateSameIdentifiers(plan)(values);
    expect(errors).toEqual();
  });
});
