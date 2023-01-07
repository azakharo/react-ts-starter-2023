import {getNameInitials} from './strings';

describe('Test getNameInitials()', () => {
  test('empty string => empty string', () => {
    expect(getNameInitials('')).toEqual('');
  });

  test('normal case: first name, last name => the initials', () => {
    expect(getNameInitials('Alexey Zakharov')).toEqual('AZ');
  });

  test('if only first name or last name provided => output 2 first letters', () => {
    expect(getNameInitials('Alexey')).toEqual('AL');
  });
});
