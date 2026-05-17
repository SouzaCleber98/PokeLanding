export default function generateGradient(
  colors: string[],
  angle: number = 200
): React.CSSProperties {
  if (colors.length === 0) return {};
  if (colors.length === 1) return { backgroundColor: colors[0] };

  const colorGradientString = colors.join(', ');

  return {
    backgroundImage: `linear-gradient(${angle}deg, ${colorGradientString})`,
  };
}
