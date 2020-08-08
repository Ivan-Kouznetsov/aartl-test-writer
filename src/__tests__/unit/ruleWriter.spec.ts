import { getCommonTopLevelProperties, createRules, alwaysTheSame } from '../../ruleWriter';
import { books } from './fixtures/commonProps.fixtures';
import { PathType } from '../../types/ITypedPath';

describe('Rule writer', () => {
  it('should get common properties', () => {
    const commonProps = getCommonTopLevelProperties(books);

    expect(commonProps).toEqual(['title', 'author', 'year']);
  });

  it('should create array rules', () => {
    const rules = createRules(
      { arr: [{ title: 'hello' }, { title: 'hello' }, { title: 'hello' }] },
      { path: '$..arr', type: PathType.array }
    );

    expect(rules[0]).toEqual({ '$..arr': 'count > 0' });
    expect(rules.length).toEqual(1);
  });

  it('should create number rules', () => {
    const rules = createRules({ arr: [{ id: 0 }, { id: 1 }, { id: 2 }] }, { path: '$..id', type: PathType.number });

    expect(rules[0]).toEqual({ '$..id': '>= 0' });
    expect(rules.length).toEqual(1);
  });
});
