import React from 'react';
import { createUseStyles } from 'react-jss';
import { RequestFormModel, RequestFormItemModel, RequestFormTypeEnums } from '../models/RequestForm';
import RequestFormStepPanel from '../components/requestForm/RequestFormStepPanel';
import RequestFormCheckboxItem from '../components/requestForm/RequestFormCheckboxItem';
import RequestFormSelectItem from '../components/requestForm//RequestFormSelectItem';
import SoomgoService from '../services/soomgoService';
import { withPreventEvent } from '../hofs/dom';

const useStyles = createUseStyles<string, { active: boolean }>({
  container: {
    margin: '0 auto',
    maxWidth: '640px',
    border: '1px solid #f0f0f0'
  },
  pageTitle: {},
  stepPanelHide: {
    display: 'none'
  }
})

type SelectedRequestFormItems = Record<RequestFormItemModel['itemId'], number[]>;

const Reqeust = () => {
  const classes = useStyles();
  const [reqeustForm, setReqeustForm] = React.useState<RequestFormModel>();
  const [selectedRequestFormItems, setSelectedRequestFormItems] = React.useState<SelectedRequestFormItems>();
  const [currentRequestFormStepIdx, setCurrentRequestFormStepIdx] = React.useState<number>(0);
  const requestFormItemLength: number = reqeustForm ? reqeustForm.items.length : 0;
  const isLastRequestFormStep: boolean = currentRequestFormStepIdx === (requestFormItemLength - 1);

  const getRequestForm = () => {
    (async () => {
      let response = await SoomgoService.getRequestForm('input_clean');
      console.log('[getRequestForm@response]', response);
      const requestFormModel = new RequestFormModel(response);
      const requestFormItems:SelectedRequestFormItems = {};
      for (const item of requestFormModel.items) {
        requestFormItems[item.itemId] = [];
      }
      setSelectedRequestFormItems(requestFormItems);
      setReqeustForm(requestFormModel);
    })();
    return () => {};
  };

  const stepHelper = {
    move(requestFormStepIdx: number) {
      setCurrentRequestFormStepIdx(requestFormStepIdx);
    },
  }
  
  const handleFormChange = (item: RequestFormItemModel, optionIds: Array<number>) => {
    console.log('Request@handleFormChange', {item, optionIds });
    setSelectedRequestFormItems({ ...selectedRequestFormItems, [item.itemId]: optionIds })
  };
  
  const handleFormSubmit = (event: React.FormEvent) => {
    console.log('[Request@handleFormSubmit]', event);
  };

  React.useEffect(getRequestForm, []);


  const stepOperationButton = (
    <div>
      <button 
        type="button"
        disabled={currentRequestFormStepIdx === 0}
        onClick={withPreventEvent(() => stepHelper.move(currentRequestFormStepIdx - 1))}>
        Back
      </button>
      {isLastRequestFormStep ? (
        <button 
          type="submit">
          Submit
        </button>
      ) : (
        <button 
          type="button"
          onClick={withPreventEvent(() => stepHelper.move(currentRequestFormStepIdx + 1))}>
          Next
        </button>
      )}
      <button 
        type="button"
        disabled={currentRequestFormStepIdx === 0}
        onClick={withPreventEvent(() => stepHelper.move(0))}>
        Restart
      </button>
    </div>
  );

  const mapRequestFormStep = (item: RequestFormItemModel) => {
    const itemProps = {
      item: item,
      selectedOptionIds: (selectedRequestFormItems as SelectedRequestFormItems)[item.itemId] as Array<number>,
      onChange: (optionIds: number[]) => handleFormChange(item, optionIds)
    };
    const stepPanelClasses = reqeustForm && reqeustForm.items.findIndex(({ itemId }) => itemId === item.itemId) !== currentRequestFormStepIdx ? classes.stepPanelHide : undefined;

    return (
      <RequestFormStepPanel className={stepPanelClasses} title={item.title} key={item.itemId}>
        {item.formType === RequestFormTypeEnums.checkbox ? (
          <RequestFormCheckboxItem {...itemProps} />
        ) : item.formType === RequestFormTypeEnums.select ? 
          <RequestFormSelectItem {...itemProps}/> 
          : null}
      </RequestFormStepPanel>
    );
  }
  
  return (
    <div className={classes.container}>
      <section>
        <h2 className={classes.pageTitle}>전문가에게 의뢰하기</h2>
        {!reqeustForm ? 'loading..' : (
          <form onSubmit={withPreventEvent(handleFormSubmit)}>
            <h3>{reqeustForm.title}</h3>
            {reqeustForm.items.map(mapRequestFormStep)}
            {stepOperationButton}
          </form>
        )}
      </section>
    </div>
  );
}

export default Reqeust;