export type RequestFormKeys = 'input_clean' | 'input_lesson';

export type RequestFormItem = {
  itemId: number,
  title: string,
  formType: 'checkbox' | 'selectbox',
  options: [
    {
      id: number,
      text: string
    }
  ]
};

export type RequestForm = {
  formId: number,
  title: string,
  items: RequestFormItem[]
}