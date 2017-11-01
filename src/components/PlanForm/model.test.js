import * as R from 'ramda';
import t from '../../locale';
import * as model from './model';

describe('Saving plans', () => {
  beforeEach(() => fetch.resetMocks());

  it('should return a rejected promise when files is empty', async () => {
    fetch.mockResponseOnce('{}', { ok: true, status: 200 });
    try {
      await model.savePlans({ projectId: 1 });
      throw new Error();
    } catch (e) {
      expect(e.message).toEqual('Cannot save plans without files');
    }
  });

  it('should reject if values does not include projectId', async () => {
    try {
      await model.savePlans({ files: [] });
      throw new Error();
    } catch (e) {
      expect(e.message).toEqual('InvalidArgumentsException: ProjectId is missing or invalid!');
    }
  });

  describe('saving with a file', () => {
    it('should resolve promise with plan when file upload succeeds', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ name: '6001_123.xml' }] };

      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });

      const result = await model.savePlans(plan);
      expect(result instanceof Error).toBe(false);
    });

    it('should resolve with a plan object in the succeeded basket', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ name: '5001_123.xml' }] };

      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });

      const result = await model.savePlans(plan);
      expect(result[0][0]).toEqual(R.omit(['files'], plan));
    });

    it('should resolve with a plan object with file url in the succeeded basket', async () => {
      const plan = { projectId: 1, planId: 2, files: [{ name: '5001_123.xml' }] };

      fetch.mockResponseOnce(JSON.stringify(plan), { ok: true, status: 200 });

      const result = await model.savePlans(plan);
      expect(result[0][0]).toEqual(R.omit(['files'], plan));
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
      const plan = { projectId: 1, planId: 2, files: [{ name: '6000_123.xml' }] };

      fetch.mockResponseOnce(JSON.stringify(plan), { ok: false, status: 400 });

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
      expect(mockFn).toHaveBeenCalledTimes(files.length);
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

