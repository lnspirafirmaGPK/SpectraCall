import { searchContext } from './context-search';

describe('context-search helper', () => {
  it('returns ranked hits with provenance for decision support', () => {
    const result = searchContext({ query: 'APAC traffic budget transfer', context: ['burst response'] });

    expect(result.provider).toBe('in-memory-similarity');
    expect(result.count).toBeGreaterThan(0);
    expect(result.hits[0]).toHaveProperty('provenance.source');
    expect(result.hits[0]).toHaveProperty('provenance.artifact_ref');
    expect(result.hits[0].score).toBeGreaterThan(0);
  });
});
