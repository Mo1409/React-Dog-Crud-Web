import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import ConfirmationModal from "../components/ConfirmationModal";
import Pagination from "../components/Pagination";

/**
 * Página de listagem de animais, com suporte a paginação.
 * Exibe o botão "Cadastrar Animal", as patinhas de decoração e
 * utiliza o componente AnimalCard para cada item da lista.
 * Também usa um modal de confirmação para excluir animais.
 */
export default function ListAnimals() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mensagem de feedback vinda de outra rota
  const initialFeedback = location.state?.feedback || null;

  // Estados para animais, paginação e feedback
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(initialFeedback);

  const [animalToDelete, setAnimalToDelete] = useState(null);

  // Se veio feedback pela rota, remove do state da url
  useEffect(() => {
    if (initialFeedback) {
      window.history.replaceState({}, document.title);
    }
  }, [initialFeedback]);

  /**
   * Carrega a lista de animais da página atual
   * e também busca a contagem total para calcular totalPages.
   */
  const fetchAnimals = async (page) => {
    try {
      const [res, countRes] = await Promise.all([
        fetch(`http://localhost:8800/animals?page=${page}`),
        fetch("http://localhost:8800/animals/count"),
      ]);

      if (!res.ok || !countRes.ok) {
        throw new Error("Erro ao carregar animais");
      }

      const data = await res.json();
      const count = await countRes.json();

      // 16 animais por página
      setAnimals(data);
      setTotalPages(Math.ceil(count.total / 16));
    } catch (err) {
      setError(err.message);
      setAnimals([]);
    }
  };

  // Atualiza lista ao mudar de página
  useEffect(() => {
    fetchAnimals(currentPage);
  }, [currentPage]);

  // Remove feedback depois de alguns segundos
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Confirma exclusão de um animal
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8800/animals/${animalToDelete.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Erro ao excluir animal");

      setFeedback({
        type: "success",
        message: "Animal excluído com sucesso!",
      });

      // Recarrega a lista
      fetchAnimals(currentPage);
      setAnimalToDelete(null);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.message,
      });
      setAnimalToDelete(null);
    }
  };

  // Cancela exclusão (fecha modal)
  const cancelDelete = () => setAnimalToDelete(null);

  // Se houve erro geral na carga de dados
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      {/* Patinhas laterais */}
      <div className="img-lateral-render esquerda">
        {[...Array(20)].map((_, i) => (
          <img
            key={i}
            src="/images/esquerda.png"
            alt="patinha esquerda"
            className="tile-img"
          />
        ))}
      </div>
      <div className="img-lateral-render direita">
        {[...Array(20)].map((_, i) => (
          <img
            key={i}
            src="/images/direita.png"
            alt="patinha direita"
            className="tile-img"
          />
        ))}
      </div>

      <div className="container">
        {/* Feedback (sucesso/erro) */}
        {feedback && (
          <div className={`feedback ${feedback.type}`}>
            {feedback.message}
            <button onClick={() => setFeedback(null)}>×</button>
          </div>
        )}

        <div className="student-name">
          <h2>Mohamad Kassem Diab</h2>
        </div>

        <h1>Listagem de Animais</h1>

        {/* Paginação (topo) - usando componente */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />

        {/* Botão "Cadastrar Animal" */}
        <button className="create-button" onClick={() => navigate("/create")}>
          ➕ <span className="create-label">Cadastrar Animal</span>
        </button>

        {/* Lista de animais */}
        <ul id="usuarios-lista">
          {animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onView={() => navigate(`/details/${animal.id}`)}
              onEdit={() => navigate(`/edit/${animal.id}`)}
              onDelete={() => setAnimalToDelete(animal)}
            />
          ))}
        </ul>

        {/* Paginação (inferior) - usando componente */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>

      {/* Modal de confirmação de exclusão */}
      {animalToDelete && (
        <ConfirmationModal
          type="delete"
          title="⚠️ Confirmar Exclusão"
          message={
            <>
              <p>Você está prestes a excluir permanentemente o animal:</p>
              <div className="user-to-delete">
                <strong>{animalToDelete.nome}</strong>
                <span>ID: {animalToDelete.id}</span>
              </div>
              <p className="warning-text">Esta ação não pode ser desfeita!</p>
            </>
          }
          confirmLabel="🗑️ Confirmar Exclusão"
          cancelLabel="❌ Manter Animal"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
}
