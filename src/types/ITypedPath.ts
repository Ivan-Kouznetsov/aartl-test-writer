export enum PathType {
  string,
  number,
  boolean,
  hashMap,
}

export interface ITypedPath {
  path: string;
  type: PathType;
}
