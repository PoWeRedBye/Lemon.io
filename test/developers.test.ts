import 'reflect-metadata';
import { request } from './setup/shortcuts';

describe('Developers API tests examples', () => {
  it('should BAT fetch developers (e2e, real repository used)', async () => {
    const result = await request.get(`/api/developers`);

    expect(result.status).toBe(200);
    expect(result.body?.length).toBeGreaterThan(0);

    for (const developer of result.body) {
      expect(developer).toHaveProperty('id');
      expect(developer).toHaveProperty('firstName');
      expect(developer).toHaveProperty('lastName');
      expect(developer).toHaveProperty('email');
    }
  });
  it('should BAT fetch developers with revenue (e2e, real repository used)', async () => {
    const result = await request.get(`/api/developers?withRevenue=true`);

    expect(result.status).toBe(200);
    expect(result.body?.length).toBeGreaterThan(0);

    for (const developer of result.body) {
      expect(developer).toHaveProperty('id');
      expect(developer).toHaveProperty('firstName');
      expect(developer).toHaveProperty('lastName');
      expect(developer).toHaveProperty('email');
      expect(developer).toHaveProperty('totalRevenue');
    }
  });

  it('should BAT get developer by id', async () => {
    const result = await request.get(
      `/api/developers/65de346c255f31cb84bd10e9`,
    );

    expect(result.status).toBe(200);

    const developer = result.body;
    expect(developer).toHaveProperty('id');
    expect(developer).toHaveProperty('firstName');
    expect(developer).toHaveProperty('lastName');
    expect(developer).toHaveProperty('email');
  });

  it('should BAT get developer by id with total revenue', async () => {
    const result = await request.get(
      `/api/developers/65de346c255f31cb84bd10e9?withRevenue=true`,
    );

    expect(result.status).toBe(200);

    const developer = result.body;
    expect(developer).toHaveProperty('id');
    expect(developer).toHaveProperty('firstName');
    expect(developer).toHaveProperty('lastName');
    expect(developer).toHaveProperty('email');
    expect(developer).toHaveProperty('totalRevenue');
  });
});
