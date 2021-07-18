declare type APIResponse<P> = APIResponseSuccess<P> | APIResponseFailure<P>;

type APIResponseSuccess<P> = {
  code: number;
  success: true;
  data: P;
};

type APIResponseFailure<P> = {
  code: number;
  success: false;
  alertMessage: string;
  data?: P;
};

export interface HTTPClientInterface {
  public get<T>(path: string): Promise<T>
}