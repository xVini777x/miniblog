// CSS
import styles from "./Login.module.css";

import { useAuthentication } from "../../hooks/useAuthentication";

import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Entrar</h1>
      <p className={styles.TextInicial}>
        Faça o login para poder utilizar o sistema
      </p>

      <form onSubmit={handleSubmit} className={styles.FormRegister}>
        <label className={styles.FormRegister__label}>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.FormRegister__label}>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button disabled className="btn">
            Aguarde...
          </button>
        )}
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
