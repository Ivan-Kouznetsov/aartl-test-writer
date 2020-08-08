import { ruleWriter } from '../../ruleWriter';
import * as fixtures from './fixtures/sampleObjects.fixtures';
import { traverseObject } from '../../traverseObject';

describe('rule writer', () => {
  it('should write rules', () => {
    const paths = traverseObject(fixtures.users);
    const rules = ruleWriter(fixtures.users, paths);

    expect(rules).toEqual([
      { '$[*]': 'count > 0' },
      { '$[*]': 'each has id' },
      { '$[*]': 'each has name' },
      { '$[*]': 'each has username' },
      { '$[*]': 'each has email' },
      { '$[*]': 'each has address' },
      { '$[*]': 'each has phone' },
      { '$[*]': 'each has website' },
      { '$[*]': 'each has company' },
      { '$[*].id': 'count > 0' },
      { '$[*].id': '>= 1' },
      { '$[*].name': 'count > 0' },
      { '$[*].name': 'is text' },
      { '$[*].username': 'count > 0' },
      { '$[*].username': 'is text' },
      { '$[*].email': 'count > 0' },
      { '$[*].email': 'is text' },
      { '$[*].address': 'count > 0' },
      { '$[*].address': 'each has street' },
      { '$[*].address': 'each has suite' },
      { '$[*].address': 'each has city' },
      { '$[*].address': 'each has zipcode' },
      { '$[*].address': 'each has geo' },
      { '$[*].address.street': 'count > 0' },
      { '$[*].address.street': 'is text' },
      { '$[*].address.suite': 'count > 0' },
      { '$[*].address.suite': 'is text' },
      { '$[*].address.city': 'count > 0' },
      { '$[*].address.city': 'is text' },
      { '$[*].address.zipcode': 'count > 0' },
      { '$[*].address.zipcode': 'is text' },
      { '$[*].address.geo': 'count > 0' },
      { '$[*].address.geo': 'each has lat' },
      { '$[*].address.geo': 'each has lng' },
      { '$[*].address.geo.lat': 'count > 0' },
      { '$[*].address.geo.lat': 'is text' },
      { '$[*].address.geo.lng': 'count > 0' },
      { '$[*].address.geo.lng': 'is text' },
      { '$[*].phone': 'count > 0' },
      { '$[*].phone': 'is text' },
      { '$[*].website': 'count > 0' },
      { '$[*].website': 'is text' },
      { '$[*].company': 'count > 0' },
      { '$[*].company': 'each has name' },
      { '$[*].company': 'each has catchPhrase' },
      { '$[*].company': 'each has bs' },
      { '$[*].company.name': 'count > 0' },
      { '$[*].company.name': 'is text' },
      { '$[*].company.catchPhrase': 'count > 0' },
      { '$[*].company.catchPhrase': 'is text' },
      { '$[*].company.bs': 'count > 0' },
      { '$[*].company.bs': 'is text' },
    ]);
  });
});
