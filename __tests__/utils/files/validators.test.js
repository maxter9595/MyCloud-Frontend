import {
  validatePassword,
  validateEmail,
  validateUsername
} from '../../../src/utils/validators';

describe('Validators', () => {
  describe('validatePassword', () => {
    it('should validate correct passwords', () => {
      expect(validatePassword('Password1!')).toBe(true);
      expect(validatePassword('Secure123@')).toBe(true);
    });

    it('should reject passwords without uppercase', () => {
      expect(validatePassword('password1!')).toBe(false);
    });

    it('should reject passwords without digits', () => {
      expect(validatePassword('Password!')).toBe(false);
    });

    it('should reject passwords without special chars', () => {
      expect(validatePassword('Password1')).toBe(false);
    });

    it('should reject short passwords', () => {
      expect(validatePassword('Pwd1!')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co')).toBe(true);
    });

    it('should reject emails without @', () => {
      expect(validateEmail('test.example.com')).toBe(false);
    });

    it('should reject emails without domain', () => {
      expect(validateEmail('test@')).toBe(false);
    });

    it('should reject emails with spaces', () => {
      expect(validateEmail('test @example.com')).toBe(false);
    });
  });

  describe('validateUsername', () => {
    it('should validate correct usernames', () => {
      expect(validateUsername('user123')).toBe(true);
      expect(validateUsername('UserName')).toBe(true);
    });

    it('should reject usernames starting with digit', () => {
      expect(validateUsername('1username')).toBe(false);
    });

    it('should reject short usernames', () => {
      expect(validateUsername('usr')).toBe(false);
    });

    it('should reject long usernames', () => {
      expect(validateUsername('thisusernameistoolong123')).toBe(false);
    });

    it('should reject usernames with special chars', () => {
      expect(validateUsername('user@name')).toBe(false);
    });
  });
});
