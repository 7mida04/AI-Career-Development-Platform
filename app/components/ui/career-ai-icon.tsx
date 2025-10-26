export const CareerAIIcon = ({
  scale = 1.3, // Scale factor for proportional resizing
  color = "#E7451F",
  textColor = "#333",
  spacingFactor = 0.5, // Adjust the spacing
}: {
  scale?: number;
  color?: string;
  textColor?: string;
  spacingFactor?: number; // Allows fine-tuning the text-to-icon gap
}) => {
  // Base sizes
  const baseIconSize = 24; // Default icon size
  const baseFontSize = 16; // Default font size
  const baseSpacing = 8;   // Default spacing

  // Scaled dimensions
  const iconSize = baseIconSize * scale;
  const fontSize = baseFontSize * scale;
  const spacing = baseSpacing * scale * spacingFactor; // Reduced gap

  return (
    <div style={{ display: "flex", alignItems: "center", gap: spacing }}>
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" ry="2" />
        <rect x="8" y="3" width="8" height="4" rx="1" />
        <path d="M3 13 Q 12 18 21 13" />
        <rect x="10" y="10" width="4" height="1" rx="1" />
      </svg>
      {/* Text */}
      <span
        style={{
          color: textColor,
          fontSize: `${fontSize}px`,
          fontWeight: "bold",
        }}
      >
        Career-AI
      </span>
    </div>
  );
};
