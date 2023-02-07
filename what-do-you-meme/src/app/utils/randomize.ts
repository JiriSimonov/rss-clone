export function randomize(
  min: number,
  max: number,
  isInclusive?: boolean
): number {
  return (
    Math.floor(Math.random() * (max - min + +(isInclusive ?? false))) + min
  );
}
