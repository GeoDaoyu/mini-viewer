declare module '@geodaoyu/accessor' {
  export class Accessor {
    constructor(properties?: any);
    set(key: string, value: any): this;
    set(properties: object): this;
  }

  export const reactiveUtils: {
    watch: <T>(
      source: () => T,
      callback: (newVal: T, oldVal: T, onCleanup: () => void) => void,
      options?: { immediate?: boolean; deep?: boolean | number; }
    ) => { remove: () => void; pause: () => void; resume: () => void; stop: () => void };
    once: <T>(source: () => T) => Promise<T>;
  };
}
