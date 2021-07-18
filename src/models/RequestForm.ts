export type RequestFormKeys = 'input_clean' | 'input_lesson';

export enum RequestFormTypeEnums {
  checkbox = 'checkbox',
  select = 'select',
}


export type RequestFormParam = {
  formId: number,
  title: string,
  items: RequestFormItemParam[]
}

export class RequestFormModel {
  public readonly formId: number = 0;
  public title: string = '';
  public items: Array<RequestFormItemModel>;

  constructor (params: RequestFormParam) {
    this.formId = params.formId;
    this.title = params.title;
    this.items = params.items.map(item => new RequestFormItemModel(item));
  }

  public isSelectedForm(items: Array<RequestFormItemModel>): boolean {
    return items.every(this.isSelectedFormItem);
  }

  public isSelectedFormItem(item: RequestFormItemModel): boolean {
    switch (item.formType) {
      case 'checkbox':
        // item.options.map(option => option.id)
        return true;
      case 'select':
        return true;
      default: 
        return false;
    }
  }

  public output() {
    return {
      "id": 1,
      "items": [{
        "id": 1,
        "answer": "예시 답변입니다"
      }, {
        "id": 2,
        "answer": "답변,여러개,예시답변,입니다"
      }]
    }
  }
}

export class RequestFormItemModel {
  public readonly itemId: number = 0;
  public title: string = '';
  public formType: string = '';
  public options: Array<{
    id: number,
    text: string
  }>;

  constructor (params: RequestFormItemParam) {
    this.itemId = params.itemId;
    this.title = params.title;
    this.formType = params.formType;
    this.options = params.options;
  }
}


export type RequestFormItemParam = {
  itemId: number,
  title: string,
  formType: RequestFormTypeEnums,
  options: Array<{
    id: number,
    text: string
  }>
}
