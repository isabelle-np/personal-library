import { getStampColor, getRandomOffset, getRandomRotation, getTypewriterFont, DEFAULT_LIBRARY } from '../../src/utils/cardUtils';

describe('cardUtils', () => {
  describe('getStampColor', () => {
    it('should return the correct CSS class for valid colors', () => {
      expect(getStampColor('red')).toBe('text-red-600');
      expect(getStampColor('blue')).toBe('text-blue-600');
      expect(getStampColor('brown')).toBe('text-amber-900');
      expect(getStampColor('green')).toBe('text-green-600');
    });

    it('should return the default CSS class and log a warning for invalid colors', () => {
      console.warn = jest.fn();
      expect(getStampColor('invalid')).toBe('text-gray-700');
      expect(console.warn).toHaveBeenCalledWith('Unexpected color: invalid');
    });
  });

  describe('getRandomOffset', () => {
    it('should return consistent offsets for the same input', () => {
      const offset1 = getRandomOffset('2025-09-28', 'x');
      const offset2 = getRandomOffset('2025-09-28', 'x');
      expect(offset1).toBe(offset2);
    });

    it('should return different offsets for different types', () => {
      const offsetX = getRandomOffset('2025-09-28', 'x');
      const offsetY = getRandomOffset('2025-09-28', 'y');
      expect(offsetX).not.toBe(offsetY);
    });
  });

  describe('getRandomRotation', () => {
    it('should return consistent rotations for the same input', () => {
      const rotation1 = getRandomRotation('2025-09-28');
      const rotation2 = getRandomRotation('2025-09-28');
      expect(rotation1).toBe(rotation2);
    });
  });

  describe('getTypewriterFont', () => {
    it('should return consistent fonts for the same input', () => {
      const font1 = getTypewriterFont('2025-09-28');
      const font2 = getTypewriterFont('2025-09-28');
      expect(font1).toBe(font2);
    });

    it('should return different fonts for different inputs', () => {
      const font1 = getTypewriterFont('2025-09-28');
      const font2 = getTypewriterFont('2025-09-29');
      expect(font1).not.toBe(font2);
    });
  });

  describe('DEFAULT_LIBRARY', () => {
    it('should have the correct default values', () => {
      expect(DEFAULT_LIBRARY).toEqual({
        name: 'Library of Congress',
        address: '101 Independence Ave SE, Washington, DC 20540',
      });
    });
  });
});