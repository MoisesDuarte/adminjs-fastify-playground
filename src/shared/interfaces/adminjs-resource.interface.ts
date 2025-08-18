import { ResourceOptions } from 'adminjs';

export interface IAdminJSResource<T> {
  resource: T;
  options: ResourceOptions;
}
