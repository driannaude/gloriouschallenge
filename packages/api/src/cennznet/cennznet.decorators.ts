import { ServiceUnavailableException } from '@nestjs/common';

export function IfReady() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (this.isReady) {
        return original.apply(this, args);
      }
      throw new ServiceUnavailableException('CENNZ Service not ready');
    };
  };
}
