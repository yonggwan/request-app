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

  public output(items?: Record<number, number[]>): any {
    if (!items) return {};
    const outputObj: any = {
      id: this.formId,
      items: []
    };
    
    for (const [_itemId, optionIds] of Object.entries(items)) {
      let currentItem: RequestFormItemModel = this.items.find(({ itemId }) => itemId === Number(_itemId)) as RequestFormItemModel;
      const currentItemOptions = currentItem.options.filter(option => optionIds.includes(option.id))
      outputObj.items.push({
        id: currentItem.itemId,
        answer: currentItemOptions.map(option => option.text).join(", ")
      })
    }
    return outputObj;
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
