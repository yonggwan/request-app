export type RequestFormKeys = 'input_clean' | 'input_lesson';

export class RequestFormModel {
  private readonly formId: number = -1;
  public title: string = '';
  public items: Array<RequestFormItemParam>;

  constructor (params: RequestFormParam) {
    this.formId = params.formId;
    this.title = params.title;
    this.items = params.items;
  }

  public isSelectedForm(items: Array<RequestFormItemParam>): boolean {
    return items.every(this.isSelectedFormItem);
  }

  public isSelectedFormItem(item: RequestFormItemParam): boolean {
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

export type RequestFormParam = {
  formId: number,
  title: string,
  items: RequestFormItemParam[]
}

export type RequestFormItemParam = {
  itemId: number,
  title: string,
  formType: 'checkbox' | 'select',
  options: Array<{
    id: number,
    text: string
  }>
}
