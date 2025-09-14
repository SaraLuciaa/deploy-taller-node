import { logger } from '../../middlewares/logger.middleware';
import fs from 'fs';
import path from 'path';

describe('logger middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;
  let appendFileSyncSpy: jest.SpyInstance;
  let existsSyncSpy: jest.SpyInstance;
  let mkdirSyncSpy: jest.SpyInstance;

  beforeEach(() => {
    req = {
      method: 'GET',
      baseUrl: '/api',
      path: '/test',
    };
    next = jest.fn();
    appendFileSyncSpy = jest.spyOn(fs, 'appendFileSync').mockImplementation(() => {});
    existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
    // El mock de send se guarda aparte para verificarlo después
    const sendMock = jest.fn();
    res = {
      statusCode: 200,
      send: sendMock,
      _sendMock: sendMock // para referencia en los tests
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call next()', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should log request when res.send is called', () => {
    logger(req, res, next);
    res.send('response body');
    expect(appendFileSyncSpy).toHaveBeenCalled();
    expect(res._sendMock).toHaveBeenCalledWith('response body');
  });

  it('should create logs directory if not exists', () => {
    existsSyncSpy.mockReturnValue(false);
    logger(req, res, next);
    res.send('body');
    expect(mkdirSyncSpy).toHaveBeenCalledWith(path.join(process.cwd(), 'logs'), { recursive: true });
    expect(appendFileSyncSpy).toHaveBeenCalled();
  });

  it('should log correct format', () => {
    logger(req, res, next);
    res.send('body');
    const logDir = path.join(process.cwd(), 'logs');
    const date = new Date().toISOString().split('T')[0];
    const fileName = `api-${date}.log`;
    const filePath = path.join(logDir, fileName);
    const logEntryRegex = new RegExp(`\[.*\] GET /api /test \| Status: 200 \| Time: \\d+ms\\n`);
    const logEntry = appendFileSyncSpy.mock.calls[0][1];
    expect(appendFileSyncSpy).toHaveBeenCalledWith(filePath, expect.stringMatching(logEntryRegex), 'utf8');
  });
});
