import { HTTPClientConstructor, HTTPClientInterface } from "../utils/httpClient";
import { RequestForm, RequestFormKeys } from "../models/RequestForm";

export default class SoomgoService {
  private httpClient: HTTPClientInterface;
  
  constructor (httpClient: HTTPClientConstructor) {
    this.httpClient = new httpClient('https://assets.cdn.soomgo.com');
  }

  public async getRequestForm(formKey: RequestFormKeys) {
    return this.httpClient.get<RequestForm>(`/data/exam/mock/${formKey}.json`);
  }
}