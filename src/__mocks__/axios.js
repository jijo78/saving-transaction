export default {
  get: jest.fn().mockResolvedValueOnce({ data: {} }),
  CancelToken: {
    source: jest.fn().mockResolvedValueOnce({ cancel: jest.fn() })
  }
};
