import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export { AuthContext };

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Mock API call - replace with your actual API
      // In a real app, you'd make an API call here
      if (credentials.email && credentials.password) {
        // Check if user is the bulletin admin
        const isBulletinAdmin = credentials.email === 'admin@bulletin.com' && credentials.password === 'admin123';
        
        const mockUser = {
          id: 1,
          name: credentials.name || (isBulletinAdmin ? 'Bulletin Admin' : 'User'),
          email: credentials.email,
          studentId: credentials.studentId || (isBulletinAdmin ? 'ADMIN001' : 'STU001'),
          avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
          role: isBulletinAdmin ? 'bulletin_admin' : 'student',
          permissions: isBulletinAdmin ? ['manage_bulletins', 'create_bulletins', 'delete_bulletins'] : []
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
        
        return { success: true, user: mockUser };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - replace with your actual API
      if (userData.email && userData.password && userData.name && userData.studentId) {
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          studentId: userData.studentId,
          avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userData', JSON.stringify(newUser));
        
        setUser(newUser);
        setIsAuthenticated(true);
        
        return { success: true, user: newUser };
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
