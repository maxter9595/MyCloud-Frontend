function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export const COLORS = {
  primary: '#1890ff',
  primaryHover: '#40a9ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  text: '#333',
  textSecondary: '#666',
  border: '#d9d9d9',
  background: '#f0f2f5',
  cardBackground: '#fff'
};

export const SHADOWS = {
  default: '0 2px 8px rgba(0, 0, 0, 0.1)',
  hover: '0 4px 12px rgba(0, 0, 0, 0.15)'
};

export const SPACING = {
  small: '0.5rem',
  medium: '1rem',
  large: '1.5rem',
  xlarge: '2rem'
};

export const BORDER_RADIUS = {
  small: '4px',
  medium: '8px',
  large: '12px'
};

export const COMPONENTS = {
  button: {
    primary: {
      background: COLORS.primary,
      hover: COLORS.primaryHover
    }
  },
  input: {
    border: `1px solid ${COLORS.border}`,
    focus: `0 0 0 2px rgba(${hexToRgb(COLORS.primary)}, 0.2)`
  }
};
