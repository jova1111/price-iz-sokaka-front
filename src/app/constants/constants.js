import { environment } from '../../environments/environment';

function requestUrl() {
  return environment.backend_url;
}


export { requestUrl }
