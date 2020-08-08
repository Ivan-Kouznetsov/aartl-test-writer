import { traverseObject } from '../../traverseObject';
import { ditto } from './fixtures/traverseObject.fixtures';
describe('traverseObject', () => {
  it('should should traverse an object', () => {
    const paths = traverseObject(ditto);

    expect(paths.size).toBe(630);
  });
});
