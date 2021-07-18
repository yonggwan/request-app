export const withPreventEvent = (passedEventHandler: any) => (event: React.SyntheticEvent) => {
  console.log('withPreventEvent');
  event.preventDefault();
  passedEventHandler(event);
};
