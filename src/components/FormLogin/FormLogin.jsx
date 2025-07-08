import { useForm } from 'react-hook-form';
import styles from './FormLogin.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/authHandler';

function FormLogin() {
  const { handleLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Agora apenas chamamos handleLogin e deixamos ele lidar com a verificação
    handleLogin(data.email, data.senha);
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
          <label htmlFor="exampleInputPassword1" className="form-label">
            Senha:
          </label>
          <input
            type="password"
            className={`form-control ${styles.input}`}
            id="exampleInputPassword1"
            {...register('senha', { required: 'Senha é obrigatória' })}
          />
          {errors.senha && <span>{errors.senha.message}</span>}
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${styles.button}`}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default FormLogin;