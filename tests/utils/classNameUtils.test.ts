import { cn } from '../../src/utils/classNameUtils';

describe('cn utility function', () => {
  it('should combine multiple class names into a single string', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('should handle conditional class names', () => {
    const result = cn('class1', false && 'class2', 'class3');
    expect(result).toBe('class1 class3');
  });

  it('should merge Tailwind CSS classes correctly', () => {
    const result = cn('bg-red-500', 'bg-blue-500');
    expect(result).toBe('bg-blue-500');
  });

  it('should handle empty inputs gracefully', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle null and undefined inputs', () => {
    const result = cn('class1', null, undefined, 'class2');
    expect(result).toBe('class1 class2');
  });
});