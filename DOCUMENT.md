## For document this project

### Import many user by excel file

```bash
npm i xlsx

```

### General Request

| Category          | Example                                               |
| ----------------- | ----------------------------------------------------- |
| Training          | React, project management, cybersecurity short course |
| Language course   | English, Chinese, French                              |
| Equipment         | Laptop, monitor, keyboard, office chair               |
| Software          | Figma, GitHub, Microsoft 365, VPN access              |
| Workplace support | Desk repair, internet issue, workspace change         |
| Financial support | Training fee, certification fee                       |
| Document          | Employment letter, recommendation letter              |
| Other             | A request that does not match another category        |



# Forgot Password Feature — Technical Description

The **Forgot Password** feature allows users to securely reset their password when they cannot remember it. The feature is divided into three main steps: requesting a password reset, verifying an OTP code, and creating a new password.

## 1. Request Password Reset

The user enters their registered email address on the Forgot Password page.

The system validates the email format and checks whether the email exists in the database. If the email is valid, the system generates a six-digit OTP code.

For security, the OTP is hashed before being stored in the database. The system also stores the OTP expiration time, resend cooldown time, and failed verification attempt count.

During local development, the OTP can be printed in the terminal. In production, the OTP can be sent to the user's email using an SMTP service.

After the request is created successfully, the user is redirected to the OTP verification page.

## 2. Verify OTP

On the OTP verification page, the user enters the six-digit code.

The backend validates that the OTP contains exactly six digits and checks whether:

- The OTP is correct.
- The OTP has expired.
- The OTP has already been used.
- The user has exceeded the maximum number of failed attempts.

The OTP entered by the user is hashed and compared with the stored OTP hash.

If verification is successful, the system generates a short-lived password reset token. The user is then redirected to the New Password page.

## 3. Set New Password

On the New Password page, the user enters:

- New password
- Confirm new password

The system validates the password strength and checks that both passwords match.

The new password is hashed using bcrypt before it is stored in the database. The original password is never stored as plain text.

After the password is successfully updated, the system invalidates the OTP and password reset token so they cannot be reused.

The user is then redirected to the Login page and sees the message:

> Your password has been reset successfully.

## Technologies Used

### Next.js

Next.js is used to build both the frontend pages and backend API routes.

Frontend pages include:

- Forgot Password
- Verify OTP
- New Password
- Login

Backend API routes handle:

- Request OTP
- Verify OTP
- Resend OTP
- Reset Password

### React

React is used to manage frontend state such as:

- Email
- OTP
- Password
- Loading state
- Error messages

It also handles user interactions such as form submission and button clicks.

### TypeScript

TypeScript provides type safety and helps prevent coding mistakes.

Example:

```ts
type SendOtpEmailProps = {
  email: string;
  otp: string;
};
```

This ensures that the email and OTP values use the expected data types.

### Zod

Zod is used for request validation.

It validates information such as:

- Email format
- Six-digit OTP
- Password strength
- Confirm password

This prevents invalid data from reaching the main business logic.

### Drizzle ORM

Drizzle ORM is used to communicate with the PostgreSQL database using TypeScript.

It handles operations such as:

- Find user by email
- Create password-reset request
- Update failed OTP attempts
- Verify reset request
- Update user password
- Invalidate OTP

### PostgreSQL

PostgreSQL stores the application data.

The password-reset system stores information such as:

- User ID
- OTP hash
- Expiration time
- Failed attempts
- Verification status
- Reset token
- Used status

### Node.js Crypto

The Node.js `crypto` module is used to securely generate OTP codes and password-reset tokens.

It is also used to hash OTP values before storing them in the database.

Instead of storing:

```text
583921
```

the database stores a hashed value.

This improves security if the database is exposed.

### bcrypt

bcrypt is used to hash the user's new password before saving it.

The password flow is:

```text
User password
    ↓
bcrypt
    ↓
Hashed password
    ↓
Database
```

The application never stores the user's original password directly.

### Nodemailer

Nodemailer is used to send OTP codes through email using SMTP.

In development, OTP codes can be printed in the terminal instead of sending real emails.

The production flow can be:

```text
Next.js
   ↓
Nodemailer
   ↓
SMTP server
   ↓
User email
```

### Environment Variables

Environment variables are used to store private configuration such as:

```env
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
PASSWORD_RESET_SECRET
```

Sensitive information should not be written directly inside the source code or committed to Git.

## Overall Flow

```text
Forgot Password
      ↓
Enter registered email
      ↓
Generate OTP
      ↓
Hash and save OTP
      ↓
Send / display OTP
      ↓
Verify OTP
      ↓
Generate reset token
      ↓
Enter new password
      ↓
Hash new password
      ↓
Update database
      ↓
Invalidate OTP and token
      ↓
Redirect to Login
```

## Technology Summary

| Technology | Purpose |
|---|---|
| Next.js | Frontend pages and backend API routes |
| React | UI state and user interaction |
| TypeScript | Type safety |
| Zod | Input validation |
| Drizzle ORM | Database queries and schema management |
| PostgreSQL | Data storage |
| Node.js Crypto | OTP and reset-token generation/hashing |
| bcrypt | Secure password hashing |
| Nodemailer | Sending OTP emails |
| Environment Variables | Storing private configuration and secrets |

This combination creates a secure, maintainable, and realistic password-reset workflow for a modern web application.
