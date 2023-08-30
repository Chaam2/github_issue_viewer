import { IRepository } from '../types/repositoryType';
import Api from './Api';

export const getRepository = async (): Promise<IRepository> => {
  return await Api.get('');
};
