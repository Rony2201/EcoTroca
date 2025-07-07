import styles from "./Sobre.module.css";
import Cards from "./Cards/Cards"


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
                  <Cards title="1. Cadastre-se" paragrafo=" Crie sua conta gratuitamente para começar a participar." />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <Cards title="2. Anuncie" paragrafo="Publique os itens que deseja trocar com fotos e descrição." />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <Cards title="3. Encontre" paragrafo="Busque itens de interesse e veja as oportunidades de troca." />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <Cards title="4. Proponha" paragrafo="Converse com outros usuários e proponha trocas justas." />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                  <Cards title="5. Finalize" paragrafo="Conclua a troca e avalie a experiência para ajudar a
                    comunidade." />
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
