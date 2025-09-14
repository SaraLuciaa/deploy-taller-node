import { userService } from '../../services/user.service';
import { UserModel } from '../../models';
import bcrypt from 'bcrypt';

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and hash password (positive)', async () => {
      const userInput = { name: 'Test', email: 'test@test.com', password: '123456' };
      const hashedPassword = 'hashed123';
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      const createUserMock = {
        toObject: () => ({ _id: 'id1', name: 'Test', email: 'test@test.com', password: hashedPassword })
      };
      jest.spyOn(UserModel, 'create').mockResolvedValue(createUserMock as any);
      const result = await userService.create(userInput as any);
      expect(result).toEqual({ _id: 'id1', name: 'Test', email: 'test@test.com' });
    });

    it('should throw error if user exists (negative)', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue({} as any);
      await expect(userService.create({ name: 'Test', email: 'test@test.com', password: '123456' } as any)).rejects.toThrow('User already exists');
    });
  });

  describe('findByEmail', () => {
    it('should call UserModel.findOne with correct select (positive)', async () => {
      const selectMock = jest.fn();
      const findOneMock = jest.spyOn(UserModel, 'findOne').mockReturnValue({ select: selectMock } as any);
      userService.findByEmail('test@test.com');
      expect(findOneMock).toHaveBeenCalledWith({ email: 'test@test.com' });
      expect(selectMock).toHaveBeenCalledWith('-password');
    });
  });

  describe('update', () => {
    it('should update user and return updated user (positive)', async () => {
      const updatedUser = { _id: 'id1', name: 'Updated' };
      jest.spyOn(UserModel, 'findOneAndUpdate').mockResolvedValue(updatedUser as any);
      const result = await userService.update('id1', { name: 'Updated' } as any);
      expect(result).toEqual(updatedUser);
    });
    it('should throw error on update failure (negative)', async () => {
      jest.spyOn(UserModel, 'findOneAndUpdate').mockRejectedValue(new Error('Update error'));
      await expect(userService.update('id1', { name: 'Updated' } as any)).rejects.toThrow('Update error');
    });
  });

  describe('getAll', () => {
    it('should return all users (positive)', async () => {
      jest.spyOn(UserModel, 'find').mockResolvedValue([{ _id: 'id1' }, { _id: 'id2' }] as any);
      const result = await userService.getAll();
      expect(result).toEqual([{ _id: 'id1' }, { _id: 'id2' }]);
    });
  });

  describe('getById', () => {
    it('should return user by id (positive)', async () => {
      jest.spyOn(UserModel, 'findById').mockResolvedValue({ _id: 'id1' } as any);
      const result = await userService.getById('id1');
      expect(result).toEqual({ _id: 'id1' });
    });
  });

  describe('delete', () => {
    it('should return true if user deleted (positive)', async () => {
      jest.spyOn(UserModel, 'findByIdAndDelete').mockResolvedValue({ _id: 'id1' } as any);
      const result = await userService.delete('id1');
      expect(result).toBe(true);
    });
    it('should return false if user not found (negative)', async () => {
      jest.spyOn(UserModel, 'findByIdAndDelete').mockResolvedValue(null);
      const result = await userService.delete('id1');
      expect(result).toBe(false);
    });
    it('should throw error on delete failure (negative)', async () => {
      jest.spyOn(UserModel, 'findByIdAndDelete').mockRejectedValue(new Error('Delete error'));
      await expect(userService.delete('id1')).rejects.toThrow('Delete error');
    });
  });
});
