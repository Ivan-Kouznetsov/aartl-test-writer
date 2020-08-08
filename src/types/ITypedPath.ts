export enum PathType {
  string,
  number,
  boolean,
  hashMap,
  array,
}

export interface ITypedPath {
  path: string;
  type: PathType;
}
