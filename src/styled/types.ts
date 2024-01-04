export type StyledPrefix<T> = {
  [K in keyof T as K extends string ? `$${K}` : never]: T[K];
};
