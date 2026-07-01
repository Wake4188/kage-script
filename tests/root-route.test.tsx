import { describe, expect, it } from 'vitest';

import { SECURITY_HEADERS } from '../src/server';
import { Route } from '../src/routes/__root';

describe('root route bootstrap', () => {
  it('can be imported without crashing', () => {
    expect(Route).toBeDefined();
  });

  it('allows inline scripts in the CSP header for framework bootstrapping', () => {
    expect(SECURITY_HEADERS['Content-Security-Policy']).toContain("script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com");
  });
});
