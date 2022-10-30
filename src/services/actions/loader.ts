import { SHOW_LOADER } from './actionTypes';

const showLoader = (loader: boolean) => {
  return { type: SHOW_LOADER, loader };
};

export default showLoader;
