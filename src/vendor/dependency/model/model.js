import config from '../../../config/model';

const { model, table } = config;
const unloadedSubscriber = model;
const unloadSubscriberTable = table;

const processorTable = {};
for (let [eventName, eventProcessor] of Object.entries(unloadSubscriberTable)) {
  for (let [controller, method] of Object.entries(eventProcessor)) {
    processorTable[eventName] = processorTable[eventName] || [];
    const processor = unloadedSubscriber[controller][method];
    processorTable[eventName].push(processor);
  }
}

const bubble = (eventName, page, component, id) => {
  if (processorTable.hasOwnProperty(eventName)) {
    for (let i = 0; i < processorTable[eventName].length; i++) {
      const event = {};
      event.name = eventName;
      event.subscription = id;
      event.subscriber = i;
      processorTable[eventName][i](page, component, event);
    }
  }
};

const delegation = { bubble, config };
export default delegation;