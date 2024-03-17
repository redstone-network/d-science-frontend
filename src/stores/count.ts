import {equal} from '@utils';
import {createWithEqualityFn} from 'zustand/traditional';

type State = {
  account: string;
};

type Action = {
  setAccount: (s: string) => void;
};

export const useAccountState = createWithEqualityFn<State & Action>(function (
  set,
) {
  return {
    account: '',
    setAccount(address: string) {
      set(function () {
        return {
          account: address,
        };
      }, false);
    },
  };
}, equal);
