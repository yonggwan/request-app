import { HTTPClientConstructor } from './httpClient';

class FetchClient implements HTTPClientConstructor {
  private apiHost: string;
  
  constructor(apiHost: string) {
    this.apiHost = apiHost;
  }

  public async get<T>(path: string, init?: RequestInit): Promise<T> {
    const requestInit = this.getRequestInit(init);
    requestInit.method = 'GET';
    const response = await fetch(path, requestInit);
    return await response.json();
  }

  private getRequestInit = (requestOptions: RequestInit = {}) => {
    const requestInit: Record<string, any> = mergeDeep(
      {
        mode: 'cors', // For cross-site request (https://assets.cdn.soomgo.com)
        headers: {
          'Content-Type': 'application/json',
        },
      },
      requestOptions
    );
    return requestInit;
  };
  

  private getHeaders(): RequestInit['headers'] {
    return {
      contentType: 'application/json',
    }
  }
}

export default new FetchClient('');