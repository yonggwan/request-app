import { HTTPClientConstructor, HTTPClientInterface } from "../utils/httpClient";
import { RequestFormParam, RequestFormKeys } from "../models/RequestForm";
import FetchClient from "../utils/fetchClient";
import input_clean from '../mocks/input_clean.json';
import input_lesson from '../mocks/input_lesson.json';

class RequestService {
  private httpClient: HTTPClientInterface;
  
  constructor (httpClient: HTTPClientConstructor) {
    if (!process.env.REACT_APP_REQUEST_SERVICE_API_HOST) throw new Error('REQUEST_SERVICE_API_HOST is not provided');
    this.httpClient = new httpClient(process.env.REACT_APP_REQUEST_SERVICE_API_HOST);
  }

  public async getRequestForm(formKey: RequestFormKeys): Promise<RequestFormParam> {
    if (process.env.REACT_APP_DEBUG === 'true') return this.getRequestFormMock(formKey);
    return await this.httpClient.get<RequestFormParam>(`/data/exam/mock/${formKey}.json`);
  }

  public async getRequestFormMock(formKey: RequestFormKeys): Promise<RequestFormParam> {
    const mockMap = { input_clean, input_lesson } as Record<RequestFormKeys, RequestFormParam>;
    return await new Promise((resolve) => resolve(mockMap[formKey]));
  }
}

export default new RequestService(FetchClient);