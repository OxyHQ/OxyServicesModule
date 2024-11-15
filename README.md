# Oxy Services Module 🚀

The Oxy Services Module is a comprehensive package designed to provide reusable services and components for building front-end applications with Oxy. It includes hooks and components for session management, user handling, and more, making it easier to integrate Oxy-based functionalities into your React applications.

## Features ✨
- **Session Management**: Easily manage user sessions with hooks like `useOxySession`.
- **User Handling**: Fetch and display user information using functions like `getUserById`.
- **Components**: Ready-to-use components such as `SignInButton`, `AccountSwitcherModal`, and `SessionOwnerButton`.

## Usage Instructions

To use the OxyServicesModule, follow these steps:

1. Install the package:
   ```bash
   npm install @oxyhq/services
   ```

2. Import the necessary components and hooks in your project:
   ```javascript
   import { useOxySession, getUserById, SignInButton, AccountSwitcherModal, SessionOwnerButton } from '@oxyhq/services';
   ```

3. Use the components and hooks in your application. For example, to use the `SignInButton` component:
   ```javascript
   import React from 'react';
   import { SignInButton } from '@oxyhq/services';

   const App = () => {
     return (
       <div>
         <SignInButton />
       </div>
     );
   };

   export default App;
   ```

## Examples

### Example 1: Using `useOxySession` Hook

The `useOxySession` hook fetches session data and provides error handling and status management.

```javascript
import React from 'react';
import { useOxySession } from '@oxyhq/services';

const SessionComponent = () => {
  const { session, status, error } = useOxySession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default SessionComponent;
```

### Example 2: Using `getUserById` Function

The `getUserById` function fetches user data by ID and handles possible errors.

```javascript
import React, { useEffect, useState } from 'react';
import { getUserById } from '@oxyhq/services';

const UserComponent = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserComponent;
```
