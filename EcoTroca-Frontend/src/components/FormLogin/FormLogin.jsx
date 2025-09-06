import { useForm } from 'react-hook-form';
import styles from './FormLogin.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/authHandler';
import { Link } from 'react-router-dom';

function FormLogin() {
  const { handleLogin, error, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleLogin(data.email, data.password); // Corrigido para 'password'
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className={`form-control ${styles.input}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register('email', { required: 'Email é obrigatório' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Senha:
          </label>
          <input
            type="password"
            className={`form-control ${styles.input}`}
            id="passwordInput"
            // Corrigido para 'password' no register
            {...register('password', { required: 'Senha é obrigatória' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${styles.button}`}
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </form>

      <div className="mt-3 text-center">
        <p>Ainda não tem uma conta? <Link to="/criarConta">Crie a sua aqui.</Link></p>
      </div>
    </div>
  );
}

export default FormLogin;