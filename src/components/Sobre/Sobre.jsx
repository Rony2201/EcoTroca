import styles from "./Sobre.module.css";

function Sobre() {
  return (
    <>
      <section className={`${styles.section} ${styles.bgGray}`}>
        <div className="container py-5">
          <h2 className="text-center mb-4">O que é a Ecotroca?</h2>
          <p className="mb-3">
            A Ecotroca é uma plataforma colaborativa criada para facilitar a
            troca consciente de itens sustentáveis. Nosso objetivo é promover o
            consumo responsável, dar novo uso a objetos que ainda têm valor e
            fortalecer a cultura da reutilização como forma de cuidado com o
            meio ambiente.
          </p>
          <p className="mb-3">
            Aqui, você pode trocar itens que não usa mais — como utensílios
            domésticos, roupas, livros, brinquedos e objetos ecológicos — por
            outros que façam sentido para o seu dia a dia. Tudo de forma
            simples, sem necessidade de dinheiro, valorizando a colaboração, o
            respeito e o reaproveitamento.
          </p>
          <p className="mb-3">
            Na Ecotroca, acreditamos que o que é inútil para uns pode ser útil
            para outros. E mais do que isso: que pequenas atitudes coletivas são
            capazes de gerar um grande impacto positivo no planeta. Participe
            dessa rede de trocas sustentáveis e ajude a construir um futuro com
            menos desperdício e mais conexão entre as pessoas!
          </p>
        </div>
      </section>
      <section className={`${styles.section} ${styles.bgWhite}`}>
        <div className="container py-5">
          <h2 className="text-center mb-4">🌿 Como usar a Ecotroca</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <h5 className="card-title">1. Cadastre-se</h5>
                  <p className="card-text">
                    Crie sua conta gratuitamente para começar a participar.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <h5 className="card-title">2. Anuncie</h5>
                  <p className="card-text">
                    Publique os itens que deseja trocar com fotos e descrição.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <h5 className="card-title">3. Encontre</h5>
                  <p className="card-text">
                    Busque itens de interesse e veja as oportunidades de troca.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <h5 className="card-title">4. Proponha</h5>
                  <p className="card-text">
                    Converse com outros usuários e proponha trocas justas.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <h5 className="card-title">5. Finalize</h5>
                  <p className="card-text">
                    Conclua a troca e avalie a experiência para ajudar a
                    comunidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sobre;
