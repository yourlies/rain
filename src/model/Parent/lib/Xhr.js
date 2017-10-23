const Xhr = {};
const requests = [];
Xhr.fetch = function (url, options) {
  if (!self.communicationIsLoaded) {
    requests.push({ url, options });
    return false;
  }
  self.$components.communication.push({
    url, options
  })
}

self.communicationOnLoaded = function (component) {
  component.push(requests)
}

export default Xhr;