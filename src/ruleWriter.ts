import { ITypedPath, PathType } from './types/ITypedPath';
import * as jsonpath from 'jsonpath';

export const getCommonTopLevelProperties = (objects: object[]) => {
  const props: string[] = [];

  objects.forEach((o) => {
    for (const prop in o) {
      if (!props.includes(prop)) props.push(prop);
    }
  });
  const propsToRemove: string[] = [];

  objects.forEach((o) => {
    props.forEach((p) => {
      if ((<Record<string, unknown>>o)[p] === undefined && !propsToRemove.includes(p)) propsToRemove.push(p);
    });
  });

  return props.filter((p) => !propsToRemove.includes(p));
};

export const alwaysTheSame = (values: any[]): { alwaysTheSame: boolean; value: any | undefined } => {
  if (values.length === 0) return { alwaysTheSame: false, value: undefined };
  if (values.length === 1) return { alwaysTheSame: true, value: values[0] };

  const first = values[0];

  for (const v of values) {
    if (v !== first) return { alwaysTheSame: false, value: undefined };
  }

  return { alwaysTheSame: true, value: first };
};

export const isAtLeast = (values: number[], proposedLowestValue: number) => Math.min(...values) >= proposedLowestValue;

export const createRules = (obj: object, path: ITypedPath): { [key: string]: string }[] => {
  const objects = jsonpath.query(obj, path.path);
  const same = alwaysTheSame(objects);

  switch (path.type) {
    case PathType.array:
      return [{ [path.path]: 'count > 0' }]; // might be redundant
    case PathType.hashMap:
      const commonProps = getCommonTopLevelProperties(objects);
      const rules: { [key: string]: string }[] = [];
      commonProps.forEach((p) => {
        rules.push({ [path.path]: `each has ${p}` });
      });
      return rules;
    case PathType.boolean:
      if (same.alwaysTheSame) {
        return [{ [path.path]: same.value.toString() }];
      } else {
        return [{ [path.path]: 'any of true false' }];
      }
    case PathType.number:
      if (same.alwaysTheSame) {
        return [{ [path.path]: same.value.toString() }];
      } else if (isAtLeast(<number[]>objects, 1)) {
        return [{ [path.path]: '>= 1' }];
      } else if (isAtLeast(<number[]>objects, 0)) {
        return [{ [path.path]: '>= 0' }];
      } else {
        return [{ [path.path]: 'is number' }];
      }
    case PathType.string:
      if (same.alwaysTheSame) {
        return [{ [path.path]: same.value.toString() }];
      } else {
        return [{ [path.path]: 'is text' }];
      }
  }
};

export const ruleWriter = (obj: any, paths: Set<ITypedPath>): { [key: string]: string }[] => {
  const result: { [key: string]: string }[] = [];

  paths.forEach((path) => {
    const rules = createRules(obj, path);
    rules.forEach((rule) => {
      if (result.find((r) => JSON.stringify(r) === JSON.stringify(rule)) === undefined) result.push(rule);
    });
  });

  return result;
};
