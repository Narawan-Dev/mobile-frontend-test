export const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const sanitizeDecimalInput = (
  text: string,
  maxDecimalPlaces = 2,
) => {
  let cleaned = text.replace(/[^0-9.]/g, '');

  const firstDotIndex = cleaned.indexOf('.');
  if (firstDotIndex !== -1) {
    const integerPart = cleaned.slice(0, firstDotIndex + 1);
    const decimalPart = cleaned
      .slice(firstDotIndex + 1)
      .replace(/\./g, '')
      .slice(0, maxDecimalPlaces);

    cleaned = integerPart + decimalPart;
  }

  if (cleaned.startsWith('.')) {
    cleaned = `0${cleaned}`;
  }

  return cleaned;
};

export const formatDecimalAmount = (value: string) => {
  if (!value) return '';

  if (value === '.') return '0.';

  const hasTrailingDot = value.endsWith('.');
  const [integerPart = '', decimalPart] = value.split('.');

  const formattedInteger = integerPart
    ? Number(integerPart).toLocaleString()
    : '0';

  if (hasTrailingDot) {
    return `${formattedInteger}.`;
  }

  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  }

  return formattedInteger;
};

export const normalizeDecimalAmount = (
  value: string,
  decimalPlaces = 2,
) => {
  if (!value) return '';

  const cleaned = sanitizeDecimalInput(value, decimalPlaces);

  if (!cleaned) return '';

  const [integerPart = '0', decimalPart = ''] = cleaned.split('.');

  const normalizedDecimal = decimalPart
    .padEnd(decimalPlaces, '0')
    .slice(0, decimalPlaces);

  return `${Number(integerPart)}.${normalizedDecimal}`;
};