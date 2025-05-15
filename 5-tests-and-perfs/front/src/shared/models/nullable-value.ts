export type NullableValue<T> = {
  [K in keyof T]: T[K] | null;
};
