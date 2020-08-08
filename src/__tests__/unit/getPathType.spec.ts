import { getPathType } from '../../traverseObject';
import { PathType } from '../../types/ITypedPath';

describe('getPathType', () => {
  it('should get types', () => {
    expect(getPathType(123)).toEqual(PathType.number);
    expect(getPathType('hello')).toEqual(PathType.string);
    expect(getPathType({ hello: 'hi' })).toEqual(PathType.hashMap);
    expect(() => {
      getPathType(undefined);
    }).toThrow();
  });
});
