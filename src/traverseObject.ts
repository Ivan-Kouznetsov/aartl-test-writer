import { ITypedPath, PathType } from './types/ITypedPath';

export const getPathType = (v: any): PathType => {
  if (typeof v === 'object' && !Array.isArray(v)) return PathType.hashMap;
  if (typeof v === 'number' || typeof v === 'bigint') return PathType.number;
  if (typeof v === 'string') return PathType.string;
  if (typeof v === 'boolean') return PathType.boolean;
  throw `${v} is not of any Path Type`;
};

export const traverseObject = (obj: any): Set<ITypedPath> => {
  const pathList: ITypedPath[] = [];

  const getPathsFromObject = (obj: any, jsonPath: string = '$'): void => {
    const objIsArray = Array.isArray(obj);
    const parentPath = objIsArray ? `${jsonPath}[*]` : jsonPath;

    for (const key in obj) {
      const value = obj[key];
      const currentJsonPath = objIsArray ? parentPath : `${parentPath}.${key}`; // avoid adding .0 .1 etc for arrays

      if (!Array.isArray(value)) pathList.push({ path: currentJsonPath, type: getPathType(value) });
      if (typeof value === 'object' && value !== null) {
        getPathsFromObject(value, currentJsonPath);
      }
    }
  };

  getPathsFromObject(obj);
  return new Set(pathList);
};
