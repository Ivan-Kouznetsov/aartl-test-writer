import { getCommonTopLevelProperties, createRules, alwaysTheSame } from '../../ruleWriter';
import { books } from './fixtures/commonProps.fixtures';
import { PathType } from '../../types/ITypedPath';

describe('Rule writer', () => {
  it('should check if all values are the same', () => {
    expect(alwaysTheSame([]).alwaysTheSame).toBe(false);
    expect(alwaysTheSame([1]).alwaysTheSame).toBe(true);
    expect(alwaysTheSame([1]).value).toBe(1);
    expect(alwaysTheSame([1, 2]).value).toBeUndefined();
    expect(alwaysTheSame([1, 1, 1]).value).toBe(1);
  });

  it('should get common properties', () => {
    const commonProps = getCommonTopLevelProperties(books);

    expect(commonProps).toEqual(['title', 'author', 'year']);
  });

  it('should create number rules', () => {
    const zeroTo2 = createRules({ arr: [{ id: 0 }, { id: 1 }, { id: 2 }] }, { path: '$..id', type: PathType.number });
    const oneTo2 = createRules({ arr: [{ id: 1 }, { id: 1 }, { id: 2 }] }, { path: '$..id', type: PathType.number });
    const same = createRules({ arr: [{ id: 42 }, { id: 42 }, { id: 42 }] }, { path: '$..id', type: PathType.number });
    const different = createRules(
      { arr: [{ id: 42 }, { id: 99 }, { id: 66 }] },
      { path: '$..id', type: PathType.number }
    );

    expect(zeroTo2[1]).toEqual({ '$..id': '>= 0' });
    expect(zeroTo2.length).toEqual(2);

    expect(oneTo2[1]).toEqual({ '$..id': '>= 1' });
    expect(oneTo2.length).toEqual(2);

    expect(same[1]).toEqual({ '$..id': '42' });
    expect(same.length).toEqual(2);

    expect(different[1]).toEqual({ '$..id': 'is number' });
    expect(different.length).toEqual(2);
  });

  it('should create boolean rules', () => {
    const alwaysSame = createRules(
      { arr: [{ is: true }, { is: true }, { is: true }] },
      { path: '$..is', type: PathType.boolean }
    );
    const notAlwaysSame = createRules(
      { arr: [{ is: false }, { is: true }, { is: true }] },
      { path: '$..is', type: PathType.boolean }
    );

    expect(alwaysSame[1]).toEqual({ '$..is': 'true' });
    expect(notAlwaysSame[1]).toEqual({ '$..is': 'any of true false' });
  });

  it('should create text rules', () => {
    const alwaysSame = createRules(
      { arr: [{ is: 'pie' }, { is: 'pie' }, { is: 'pie' }] },
      { path: '$..is', type: PathType.string }
    );
    const notAlwaysSame = createRules(
      { arr: [{ is: 'pie' }, { is: 'cake' }, { is: 'tort' }] },
      { path: '$..is', type: PathType.string }
    );

    expect(alwaysSame[1]).toEqual({ '$..is': 'pie' });
    expect(notAlwaysSame[1]).toEqual({ '$..is': 'is text' });
  });
});
