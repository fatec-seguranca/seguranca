import ExclusionService from '../src/service/ExclusionService';

import Database from '../src/Database';
beforeAll(async () => {
  await Database.createDatabaseConnection();
});
test('Send Message', async () => {
  // ExclusionService.updateList('exclusionListTest.json', 2);

  await ExclusionService.executeList('exclusionListTest.json');

  expect(true).toBe(true);
});
