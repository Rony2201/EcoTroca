import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import styles from "./Cadastrar.module.css";

const Cadastrar = () => {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      data.ownerId = Number(data.ownerId);
      data.categoryId = Number(data.categoryId);
      const response = await axios.post("http://localhost:3000/product", data);
      setMessage(response.data.message);
      reset();
    } catch (error) {
      console.error("Erro ao enviar produto:", error);
      setMessage(error.response?.data?.message || "Erro ao enviar produto");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastrar Produto</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Título:</label>
          <input type="text" {...register("title", { required: true })} />
        </div>

        <div className={styles.formGroup}>
          <label>Descrição:</label>
          <textarea {...register("description", { required: true })}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Condição:</label>
          <select {...register("condition", { required: true })}>
            <option value="">Selecione</option>
            <option value="NEW">NOVO</option>
            <option value="OLD">USADO</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Status:</label>
          <select {...register("status", { required: true })}>
            <option value="">Selecione</option>
            <option value="AVAILABLE">DISPONÍVEL</option>
            <option value="RESERVED">RESERVADO</option>
            <option value="EXCHANGED">TROCADO</option>
            <option value="INACTIVE">INATIVO</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>URL da Imagem:</label>
          <input type="text" {...register("imageUrl", { required: true })} />
        </div>

        <div className={styles.formGroup}>
          <label>Cidade:</label>
          <input type="text" {...register("city", { required: true })} />
        </div>

        <div className={styles.formGroup}>
          <label>Bairro:</label>
          <input type="text" {...register("district", { required: true })} />
        </div>

        <div className={styles.formGroup}>
          <label>Endereço:</label>
          <input type="text" {...register("address", { required: true })} />
        </div>

        <div className={styles.formGroup}>
          <label>ID da Categoria:</label>
          <input
            type="number"
            {...register("categoryId", { required: true })}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default Cadastrar;
