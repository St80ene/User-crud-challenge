import { AccessControl } from 'accesscontrol';
const accessControl = new AccessControl();

const roles = (function () {
  accessControl.grant('basic').readOwn('profile').updateOwn('profile');

  accessControl.grant('supervisor').extend('basic').readAny('profile');

  accessControl.grant('admin')
    .extend('basic')
    .extend('supervisor')
    .updateAny('profile')
    .deleteAny('profile');

  return accessControl;
})();

export default roles;