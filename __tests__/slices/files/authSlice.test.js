import authReducer, {
  login,
  logout,
  register,
  fetchCurrentUser,
  setUser,
  clearError
} from '../../../src/store/slices/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    is_superuser: false
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const actual = authReducer(initialState, setUser(mockUser));
    expect(actual.user).toEqual(mockUser);
    expect(actual.isAuthenticated).toBe(true);
  });

  it('should handle logout', () => {
    const stateWithUser = { ...initialState, user: mockUser, isAuthenticated: true };
    const actual = authReducer(stateWithUser, logout());
    expect(actual.user).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const actual = authReducer(stateWithError, clearError());
    expect(actual.error).toBeNull();
  });

  describe('async thunks', () => {
    it('should set loading true and clear error on login.pending', () => {
      const action = { type: login.pending.type };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set user and authenticated on login.fulfilled', () => {
      const action = { 
        type: login.fulfilled.type, 
        payload: { user: mockUser } 
      };
      const state = authReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set error on login.rejected', () => {
      const error = 'Login failed';
      const action = { 
        type: login.rejected.type, 
        payload: error 
      };
      const state = authReducer(initialState, action);
      expect(state.error).toEqual(error);
      expect(state.loading).toBe(false);
    });

    it('should handle register.fulfilled similar to login', () => {
      const action = { 
        type: register.fulfilled.type, 
        payload: { user: mockUser } 
      };
      const state = authReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle fetchCurrentUser.fulfilled', () => {
      const action = { 
        type: fetchCurrentUser.fulfilled.type, 
        payload: mockUser 
      };
      const state = authReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });
  });
});
