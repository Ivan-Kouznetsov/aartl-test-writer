import { ruleWriter } from '../../ruleWriter';
import * as fixtures from './fixtures/sampleObjects.fixtures';
import { traverseObject } from '../../traverseObject';

describe('rule writer', () => {
  it('should write rules', () => {
    const paths = traverseObject(fixtures.users);
    const rules = ruleWriter(fixtures.users, paths);

    expect(rules.length).toBe(33);
  });
});
