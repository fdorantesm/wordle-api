import { DateService } from './date.service';

describe('DateService', () => {
  const dateService = new DateService();

  it('Create Date time object', () => {
    const now = dateService.create();
    const now2 = new Date();
    expect(now.toDateString()).toBe(now2.toDateString());
  });

  it('Create Date time christmas object', () => {
    const christmas = '2022-12-25T00:00:00';
    const christmasDate = new Date(christmas);
    const christmasDateTime = dateService.create(new Date(christmas));
    expect(christmasDate.toDateString()).toBe(christmasDateTime.toDateString());
  });

  it('Create Date range pair', () => {
    const minutes = 5;
    const { from, to } = dateService.withinRange(minutes, 'minutes');
    expect(to.getMinutes() - from.getMinutes()).toBe(minutes);
  });

  it('Add 1 day to date object', () => {
    const day = 1;
    const now = dateService.create();
    const future = dateService.in(day, 'day');
    expect(future.getDate() - now.getDate()).toBe(day);
  });
});
