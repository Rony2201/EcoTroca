// src/components/EditarProdutoForm/EditarProdutoForm.jsx

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styles from "../Cadastrar/Cadastrar.module.css"; // Reutilizando os mesmos estilos
import { updateProduct } from "../../services/productsService"; // Importando nossa função de serviço

// O componente agora recebe props para funcionar como um modal
const EditarProdutoForm = ({ product, onSave, onClose }) => {
    // `reset` é usado para preencher o formulário com dados existentes
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Este useEffect preenche o formulário quando o componente é montado
    useEffect(() => {
        if (product) {
            // O `reset` do react-hook-form preenche todos os campos com os valores do objeto
            reset(product);
        }
    }, [product, reset]);

    const onSubmit = async (data) => {
        try {
            // Os dados do formulário já vêm no formato correto
            const updatedProduct = await updateProduct(product.id_product, data);
            setMessage("Produto atualizado com sucesso!");

            // Chama a função onSave passada pelo componente pai para atualizar a lista
            onSave(updatedProduct);

            // Fecha o modal após um pequeno atraso para o usuário ver a mensagem
            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            setErrorMessage(error.response?.data?.message || "Erro ao atualizar produto");
        }
    };

    return (
        // Estrutura de Modal
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Produto: {product.title}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className={styles.container}>
                                {message && <p className="alert alert-success">{message}</p>}
                                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

                                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                                    {/* Os campos do formulário são os mesmos do cadastro */}
                                    <div className={styles.formGroup}>
                                        <label>Título:</label>
                                        <input type="text" {...register("title", { required: true })} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Descrição:</label>
                                        <textarea {...register("description", { required: true })}></textarea>
                                    </div>
                                    {/* Adicione todos os outros campos aqui (condition, status, imageUrl, etc.)
                      Exatamente como estão no seu Cadastrar.jsx */}
                                    <div className={styles.formGroup}>
                                        <label>Condição:</label>
                                        <select {...register("condition", { required: true })}>
                                            <option value="NEW">NOVO</option>
                                            <option value="OLD">USADO</option>
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Status:</label>
                                        <select {...register("status", { required: true })}>
                                            <option value="AVAILABLE">DISPONÍVEL</option>
                                            <option value="RESERVED">RESERVADO</option>
                                            <option value="EXCHANGED">TROCADO</option>
                                            <option value="INACTIVE">INATIVO</option>
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>URL da Imagem:</label>
                                        <input type="text" {...register("imageUrl")} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Cidade:</label>
                                        <input type="text" {...register("city")} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Bairro:</label>
                                        <input type="text" {...register("district")} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Endereço:</label>
                                        <input type="text" {...register("address")} />
                                    </div>

                                    <button type="submit" className={styles.submitButton}>
                                        Salvar Alterações
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default EditarProdutoForm;