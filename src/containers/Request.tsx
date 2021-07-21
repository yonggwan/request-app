import React from 'react';
import { createUseStyles } from 'react-jss';
import { RequestFormModel, RequestFormItemModel, RequestFormTypeEnums } from '../models/RequestForm';
import RequestFormStepPanel from '../components/requestForm/RequestFormStepPanel';
import RequestFormCheckboxItem from '../components/requestForm/RequestFormCheckboxItem';
import RequestFormSelectItem from '../components/requestForm//RequestFormSelectItem';
import RequestFromStepControl from '../components/requestForm//RequestFromStepControl';
import RequestService from '../services/requestService';
import { withPreventEvent } from '../hofs/dom';
import ExceptionView from '../components/ExceptionView';

const useStyles = createUseStyles<string, { active: boolean }>({
  container: {
    margin: '0 auto',
    maxWidth: '640px',
    border: '1px solid #f0f0f0'
  },
  pageTitle: {},
  stepPanelHide: {
    display: 'none'
  },
  codeBlock: {
    fontSize: 12
  }
})

type SelectedRequestFormItems = Record<RequestFormItemModel['itemId'], number[]>;

enum RequestStatus {
  LOADING, 
  REDAY, 
  REQUESTED, 
  FINISHED
}

const Reqeust = () => {
  const classes = useStyles();
  const [reqeustForm, setReqeustForm] = React.useState<RequestFormModel>();
  const [selectedRequestFormItems, setSelectedRequestFormItems] = React.useState<SelectedRequestFormItems>();
  const [currentRequestFormStepIdx, setCurrentRequestFormStepIdx] = React.useState<number>(0);
  const requestFormItemLength: number = reqeustForm ? reqeustForm.items.length : 0;
  const isLastRequestFormStep: boolean = currentRequestFormStepIdx === (requestFormItemLength - 1);
  const [requestStatus, setRequestStatus] = React.useState<RequestStatus>(RequestStatus.LOADING);

  const stepHelper = {
    move: (requestFormStepIdx: number) => {
      setCurrentRequestFormStepIdx(requestFormStepIdx);
    },
    next: () => {
      stepHelper.move(currentRequestFormStepIdx + 1);
    },
    prev: () => {
      stepHelper.move(currentRequestFormStepIdx - 1);
    },
    finish: () => {
      setRequestStatus(RequestStatus.FINISHED);
    },
    restart: () => {
      stepHelper.move(0);
      setRequestStatus(RequestStatus.REDAY);
      setInitSelectedRequestFormItems((reqeustForm as RequestFormModel).items);
    },
    /**
     * @todo 
     */
    validateMultipleStep(items: Array<RequestFormItemModel>): boolean {
      return items.every(stepHelper.validateSingleleStep);
    },
    /**
     * @todo
     */
     validateSingleleStep(item: RequestFormItemModel): boolean {
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

  };

  const getRequestForm = () => {
    (async () => {
      let response = await RequestService.getRequestForm('input_clean');
      console.log('[getRequestForm@response]', response);
      const requestFormModel = new RequestFormModel(response);
      setInitSelectedRequestFormItems(requestFormModel.items);
      setReqeustForm(requestFormModel);
      setRequestStatus(RequestStatus.REDAY);
    })();
    return () => {};
  };

  const setInitSelectedRequestFormItems = (items: RequestFormItemModel[]) => {
    const requestFormItems: SelectedRequestFormItems = {};
      for (const item of items) {
        requestFormItems[item.itemId] = [];
      }
      setSelectedRequestFormItems(requestFormItems);
  };
  
  const handleFormChange = (item: RequestFormItemModel, optionIds: Array<number>) => {
    console.log('Request@handleFormChange', {item, optionIds });
    setSelectedRequestFormItems({ ...selectedRequestFormItems, [item.itemId]: optionIds })
  };

  React.useEffect(getRequestForm, []);

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
  
  const FinishView = (output: Record<string, any>) => (
    <div>
      <div>All Done!</div>
      <div>
        <pre className={classes.codeBlock}>{JSON.stringify(output, null, 2)}</pre>
      </div>
      <RequestFromStepControl 
        restartControl={{ disable: false, onClick: stepHelper.restart}}
      />
    </div>
  );
  
  return (
    <div className={classes.container}>
      <section>
        <h2 className={classes.pageTitle}>전문가에게 의뢰하기</h2>
        {(requestStatus === RequestStatus.LOADING || requestStatus === RequestStatus.REQUESTED) ? 
          <ExceptionView title="Now Loading.." /> : 
          reqeustForm ? 
          requestStatus === RequestStatus.FINISHED ? <FinishView output={reqeustForm.output(selectedRequestFormItems)} /> : 
          (
          <form onSubmit={withPreventEvent(stepHelper.finish)}>
            <h3>{reqeustForm.title}</h3>
            {reqeustForm.items.map(mapRequestFormStep)}
            <RequestFromStepControl 
              prevControl={{ disable: currentRequestFormStepIdx === 0, onClick: stepHelper.prev}}
              nextControl={{ disable: false, onClick: isLastRequestFormStep ? stepHelper.finish : stepHelper.next}}
              restartControl={{ disable: !isLastRequestFormStep, onClick: stepHelper.restart}}
            />
          </form>
        ) : <ExceptionView title="Loading.."><img src="https://miro.medium.com/max/1400/0*H3jZONKqRuAAeHnG.jpg" alt="loading" /></ExceptionView>}
      </section>
    </div>
  );
}

export default Reqeust;