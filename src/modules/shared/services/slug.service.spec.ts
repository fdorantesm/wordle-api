import { SlugService } from './slug.service';

describe('SlugService', () => {
  const slugService = new SlugService();
  it('pass if slug for büey is buey', () => {
    const slug = slugService.exec('büey');
    expect(slug).toBe('buey');
  });
});
