import { describe, expect, it } from 'vitest';

import { Route } from '../src/routes/__root';

describe('root route bootstrap', () => {
  it('can be imported without crashing', () => {
    expect(Route).toBeDefined();
  });
});
