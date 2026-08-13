export function LoginForm({ error }: { error?: string }) {
  return (
    <form action="/api/admin/login" className="auth-card" method="post">
      <h1>Admin sign in</h1>
      <p>
        Credentials are seeded from environment variables. The defaults stay available for
        local setup until you replace them.
      </p>

      <label className="field">
        <span>Username</span>
        <input defaultValue="admin" name="username" />
      </label>

      <label className="field">
        <span>Password</span>
        <input defaultValue="change-me" name="password" type="password" />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="button button-primary button-wide" type="submit">
        Sign in
      </button>
    </form>
  );
}
