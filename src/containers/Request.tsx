import React from 'react';
import { createUseStyles } from 'react-jss';
import { RequestFormModel, RequestFormItemModel } from '../models/RequestForm';
import RequestFormStep from '../components/requestForm/RequestFormStep';
import SoomgoService from '../services/soomgoService';
import { withPreventEvent } from '../hofs/dom';

const useStyles = createUseStyles({
  container: {
    margin: '0 auto',
    maxWidth: '640px',
    border: '1px solid #f0f0f0'
  },
  pageTitle: {},
  requestFormStep: {
    display: 'block'
  }
})




const Reqeust = () => {
  const classes = useStyles();
  const [reqeustForm, setReqeustForm] = React.useState<RequestFormModel>();
  const [selectedRequestFormMap, setSelectedRequestFormMap] = React.useState<Map<RequestFormItemModel['itemId'], Set<number>>>(new Map());
  const [currentRequestFormStepIdx, setCurrentRequestFormStepIdx] = React.useState<number>(0);
  const requestFormItemLength: number = reqeustForm ? reqeustForm.items.length : 0;
  const isLastRequestFormStep: boolean = currentRequestFormStepIdx === (requestFormItemLength - 1);

  const getRequestForm = () => {
    (async () => {
      let response = await SoomgoService.getRequestForm('input_clean');
      console.log('[getRequestForm@response]', response);
      // response.items = response.items.map(item => new RequestFormItemModel(item));
      const requestFormModel = new RequestFormModel(response);
      for (const item of requestFormModel.items) {
        selectedRequestFormMap.set(item.itemId, new Set());
      }
      setReqeustForm(requestFormModel);
      setSelectedRequestFormMap(selectedRequestFormMap);
    })();
    return () => {};
  };

  const stepHelper = {
    move(requestFormStepIdx: number) {
      setCurrentRequestFormStepIdx(requestFormStepIdx);
    },
  }
  
  const handleFormChange = (item: RequestFormItemModel, optionIds: Set<number>) => {
    console.log('Request@handleFormChange', {item, optionIds});
    setSelectedRequestFormMap(selectedRequestFormMap.set(item.itemId, optionIds));
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

  const mapRequestFormStep = (item: RequestFormItemModel) => (
    <RequestFormStep
      key={item.itemId}
      item={item}
      selectedOptionIds={selectedRequestFormMap.get(item.itemId) as Set<number>}
      onChange={(optionIds) => handleFormChange(item, optionIds)}
    />
  );
  
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