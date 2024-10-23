import { toast as t } from 'sonner';
import React from 'react';

export const useSonnerToast = ()  => {

  const toaster = (ToasterMessage: React.ReactNode | string) => {
    t(ToasterMessage, {
      position: 'top-center',
      duration: 1000,
    });
  };
  return { toaster };
};
