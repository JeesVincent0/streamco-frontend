export const googleSignupApi = async ({
  role = 'USER',
  intent = "signup",
}: {
  role?: string;
  intent?: string;
}) => {
  const state = btoa(
    JSON.stringify({
      intent,
      role,
    }),
  );

  window.location.href = `http://localhost:3001/api/auth/google?state=${state}`;
};
