import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  whatsappNumber?: string;
  preferredLanguage: string;
  authProvider: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock login function - in production, this would call your API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - in production, this would be handled by your backend
      if (email === 'test@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: email,
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
          preferredLanguage: 'en',
          authProvider: 'email'
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced Google login with proper OAuth simulation
  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate Google OAuth popup window
      const popup = window.open(
        'about:blank',
        'google-auth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site and try again.');
      }

      // Simulate Google OAuth flow
      popup.document.write(`
        <html>
          <head>
            <title>Sign in with Google</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
              }
              .container {
                text-align: center;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 1rem;
                backdrop-filter: blur(10px);
              }
              .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="spinner"></div>
              <h2>Connecting to Google...</h2>
              <p>Please wait while we authenticate your account.</p>
            </div>
          </body>
        </html>
      `);

      // Simulate OAuth processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Check if popup was closed by user
      if (popup.closed) {
        throw new Error('Authentication cancelled by user');
      }

      // Simulate successful Google authentication
      const mockGoogleUser: User = {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya.sharma@gmail.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        preferredLanguage: 'hi',
        authProvider: 'google'
      };

      // Update popup to show success
      popup.document.write(`
        <html>
          <head>
            <title>Authentication Successful</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
              }
              .container {
                text-align: center;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 1rem;
                backdrop-filter: blur(10px);
              }
              .checkmark {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                margin: 0 auto 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="checkmark">✓</div>
              <h2>Authentication Successful!</h2>
              <p>Welcome, ${mockGoogleUser.name}</p>
              <p>This window will close automatically...</p>
            </div>
          </body>
        </html>
      `);

      // Close popup after showing success message
      setTimeout(() => {
        popup.close();
      }, 2000);

      setUser(mockGoogleUser);
      localStorage.setItem('user', JSON.stringify(mockGoogleUser));
      localStorage.setItem('authToken', 'mock-google-token-' + Date.now());
      localStorage.setItem('authProvider', 'google');

    } catch (error) {
      console.error('Google login failed:', error);
      setError(error instanceof Error ? error.message : 'Google authentication failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authProvider');
  };

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');
    
    if (storedUser && authToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate token (in production, you'd verify with your backend)
        if (authToken.startsWith('mock-')) {
          setUser(parsedUser);
        } else {
          // Invalid token, clear storage
          logout();
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        logout();
      }
    }
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const value = {
    user,
    login,
    loginWithGoogle,
    logout,
    isLoading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};