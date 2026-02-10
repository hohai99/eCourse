import { describe, it, expect } from 'vitest';
import { cleanFileName } from './strConverter';

describe('cleanFileName', () => {
  it('should capitalize the first letter', () => {
    expect(cleanFileName('hello.txt')).toBe('Hello.txt');
  });

  it('should replace underscores with spaces', () => {
    expect(cleanFileName('hello_world.txt')).toBe('Hello world.txt');
  });

  it('should remove the 11-character suffix before the extension if the name is long enough', () => {
    // Simulating a filename like "report_abcdefghijk.pdf"
    // After capitalization and space replacement: "Report abcdefghijk.pdf"
    // dotIndex is 20. 20 >= 11.
    // slice(0, 9) + slice(20) -> "Report .pdf"
    // Wait, "Report " is 7 chars.
    // Let's count: R(0)e(1)p(2)o(3)r(4)t(5) (6)a(7)b(8)c(9)d(10)e(11)f(12)g(13)h(14)i(15)j(16)k(17).(18)p(19)d(20)f(21)

    // "report_abcdefghijk.pdf"
    // "Report abcdefghijk.pdf"
    // length is 22.
    // lastIndexOf('.') is 18.
    // 18 >= 11 is true.
    // slice(0, 18 - 11) = slice(0, 7) = "Report "
    // slice(18) = ".pdf"
    // Result: "Report .pdf"

    expect(cleanFileName('report_abcdefghijk.pdf')).toBe('Report .pdf');
  });

  it('should handle file names without extension', () => {
      expect(cleanFileName('hello')).toBe('Hello');
  });

  it('should handle short file names', () => {
      expect(cleanFileName('short.txt')).toBe('Short.txt');
  });
});
