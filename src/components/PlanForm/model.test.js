import * as R from 'ramda';
import { ServerResponseError } from '../../utils/ajax';
import t, { tpl } from '../../locale';
import * as model from './model';

describe('Saving plans', () => {
  describe('saving without files', () => {
    it('should return a promise', () => {
      fetch.mockResponseOnce('{}', { ok: true, status: 200 });
      return model.savePlans({ projectId: 1 });
    });

    it('should resolve promise with server response', () => {
      const plan = {};
      fetch.mockResponseOnce('{}', { ok: true, status: 200 });
      return model.savePlans({ projectId: 1 })
        .then(result => expect(result).toEqual(plan));
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

    it('should resolve with a plan object with file url', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ name: 'fileName' }] };
      const url = 'http://www.file.com/file';

      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });
      fetch.mockResponseOnce(url, { ok: true, status: 200 });

      const result = await model.savePlans(plan);
      expect(result[0]).toEqual({ ...R.omit('files', plan), url });
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
        expect(e.message).toBe(tpl('network.error.file.upload', { fileName: 'fileName' }));
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
  });
});
