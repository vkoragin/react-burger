import { SHOW_LOADER } from './actionTypes';

export type LoaderAction = {
  type: typeof SHOW_LOADER;
  loader: boolean;
};
