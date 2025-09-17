import { useContext } from "react";
import { AuthContext } from "./context/authHandler.jsx";
import { PropostaContext } from "./context/PropostaContext.jsx";
import styles from "./PropostasEnviadas.module.css";

function PropostasEnviadas() {
  const { user } = useContext(AuthContext);
  const { propostas, loading, error } = useContext(PropostaContext);

  // Filtra para pegar apenas as propostas enviadas pelo usuário logado
  const propostasEnviadas = user
    ? propostas.filter((p) => p.proposerId === user.id)
    : [];

  if (loading) {
    return <p>Carregando propostas enviadas...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className={styles.titulo}>Propostas Enviadas</h2>
      {propostasEnviadas.length > 0 ? (
        <div className="accordion" id="accordionPropostasEnviadas">
          {propostasEnviadas.map((proposta, index) => (
            <div
              className={`accordion-item ${styles.accordionItem}`}
              key={proposta.id}
            >
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button collapsed ${styles.accordionButton}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  <div className={styles.headerContent}>
                    <span>
                      Proposta para: <strong>{proposta.product.title}</strong>
                    </span>
                    <span
                      className={`${styles.status} ${
                        styles[proposta.status.toLowerCase()]
                      }`}
                    >
                      {proposta.status}
                    </span>
                  </div>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#accordionPropostasEnviadas"
              >
                <div className={`accordion-body ${styles.accordionBody}`}>
                  <p>
                    <strong>Data da proposta:</strong>{" "}
                    {new Date(proposta.createdAt).toLocaleDateString()}
                  </p>
                  <hr />
                  <h5>Mensagens:</h5>
                  {proposta.messages && proposta.messages.length > 0 ? (
                    proposta.messages.map((msg) => (
                      <div key={msg.id} className="mb-2">
                        <p className="mb-0">
                          <strong>{msg.author?.username}:</strong> {msg.content}
                        </p>
                        <small className="text-muted">
                          {new Date(msg.sentAt).toLocaleString()}
                        </small>
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma mensagem nesta proposta.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Você ainda não enviou nenhuma proposta.</p>
      )}
    </div>
  );
}

export default PropostasEnviadas;
