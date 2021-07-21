import { HTTPClientInterface } from './httpClient';

export default class FetchClient implements HTTPClientInterface {
  private apiHost: string;
  
  constructor(apiHost: string) {
    if (!apiHost) throw new Error('apiHost must be provide.');
    this.apiHost = apiHost;
  }

  public async get<T>(path: string): Promise<T> {
    const requestInit = this.getRequestInit('GET');
    const request = new Request(this.apiHost + path, requestInit);
    const response = await fetch(request);
    return await this.parseResponse<T>(response);
  }

  // parse response by contentType
  private async parseResponse<T>(response: Response): Promise<T> {
    console.log('[parseResponse]', response);
    if (response.headers.get('content-type') === 'application/json') {
      return await response.json();
    }
    return await response.text() as any;
  }

  private getRequestInit (method: RequestInit['method']): RequestInit {
    const headers = new Headers()
    headers.append('content-type', 'application/json');
    const requestInit: RequestInit = {
      method,
      headers,
      mode: 'cors', // For cross-site request
    };
    return requestInit;
  };
}