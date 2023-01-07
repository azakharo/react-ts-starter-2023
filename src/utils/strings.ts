export const getNameInitials = (name: string): string => {
  if (!name) {
    return '';
  }

  const parts = name.split(' ');
  const spaceForLigature = /[\u0600-\u06FF]/.test(name) ? ' ' : ''; // for arabian letters
  let initials = '';
  initials =
    parts.length > 1
      ? parts[0].charAt(0) +
        spaceForLigature +
        parts[parts.length - 1].charAt(0)
      : name.slice(0, 2);
  return initials.toUpperCase();
};
