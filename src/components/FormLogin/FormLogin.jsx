import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './FormLogin.module.css';
import users from '../../database/users';

function FormLogin() {
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm();


  const onSubmit = (data) => {
    console.log(data);


    const user = users.find(
      (user) => user.email === data.email && user.password === data.senha
    );

    if(user) {
        navigate('/perfil');
    } else {
      alert('Email ou senha incorretos');
    }
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
