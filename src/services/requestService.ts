import { HTTPClientConstructor, HTTPClientInterface } from "../utils/httpClient";
import { RequestFormParam, RequestFormKeys } from "../models/RequestForm";
import FetchClient from "../utils/fetchClient";
import input_clean from '../mocks/input_clean.json';
import input_lesson from '../mocks/input_lesson.json';

const isMockTest = true;

class RequestService {
  private httpClient: HTTPClientInterface;
  
  constructor (httpClient: HTTPClientConstructor) {
    this.httpClient = new httpClient('https://assets.cdn.soomgo.com');
  }

  public async getRequestForm(formKey: RequestFormKeys): Promise<RequestFormParam> {
    if (isMockTest) return this.getRequestFormMock(formKey);
    return await this.httpClient.get<RequestFormParam>(`/data/exam/mock/${formKey}.json`);
  }

  public async getRequestFormMock(formKey: RequestFormKeys): Promise<RequestFormParam> {
    const mockMap = { input_clean, input_lesson } as Record<RequestFormKeys, RequestFormParam>;
    return await new Promise((resolve) => resolve(mockMap[formKey]));
  }
}

export default new RequestService(FetchClient);