import { HTTPClientConstructor, HTTPClientInterface } from "../utils/httpClient";
import { RequestFormParam, RequestFormKeys } from "../models/RequestForm";
import FetchClient from "../utils/fetchClient";

class SoomgoService {
  private httpClient: HTTPClientInterface;
  
  constructor (httpClient: HTTPClientConstructor) {
    this.httpClient = new httpClient('https://assets.cdn.soomgo.com');
  }

  public async getRequestForm(formKey: RequestFormKeys): Promise<RequestFormParam> {
    return await this.httpClient.get<RequestFormParam>(`/data/exam/mock/${formKey}.json`);
  }
}

export default new SoomgoService(FetchClient);