import { getCommonTopLevelProperties } from '../../ruleWriter';
import { books } from './fixtures/commonProps.fixtures';

describe('Rule writer', () => {
  it('should get common properties', () => {
    const commonProps = getCommonTopLevelProperties(books);

    expect(commonProps).toEqual(['title', 'author', 'year']);
  });
});
