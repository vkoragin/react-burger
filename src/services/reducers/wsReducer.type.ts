import { TMassage } from '../../types';

export type WsStore = {
  wsConnected: boolean;
  messages: TMassage[];
  error: string;
};
