import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";

/**
 * Página de detalhes de um animal específico.
 * Mostra todas as informações do animal e permite:
 *  - Editar
 *  - Excluir (com confirmação)
 *  - Voltar para lista
 */
export default function AnimalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Carrega dados do animal ao montar
  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`http://localhost:8800/animals/${id}`);
        if (!response.ok) throw new Error("Animal não encontrado");

        const data = await response.json();
        setAnimal(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAnimal();
  }, [id]);

  // Exibe modal de confirmação ao clicar em "Excluir"
  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  // Confirma exclusão via DELETE
  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8800/animals/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir animal");

      navigate("/", {
        state: {
          feedback: {
            type: "success",
            message: "Animal excluído com sucesso!",
          },
        },
      });
    } catch (err) {
      setError(err.message);
      setShowDeleteConfirm(false);
    }
  };

  // Se houve erro
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Enquanto carrega ou se não encontrou animal
  if (!animal) {
    return <div className="error-message">Animal não encontrado</div>;
  }

  return (
    <div className="container">
      <h1>Detalhes do Animal</h1>

      <div className="modal-box">
        {error && <div className="feedback error">{error}</div>}

        <div className="user-details-content">
          <p><strong>ID:</strong> {animal.id}</p>
          <p><strong>Nome:</strong> {animal.nome}</p>
          <p><strong>Idade:</strong> {animal.idade}</p>
          <p><strong>Sexo:</strong> {animal.sexo === "macho" ? "Macho" : "Fêmea"}</p>
          <p><strong>Raça:</strong> {animal.raca}</p>
          <p><strong>Porte:</strong> {animal.porte}</p>
        </div>

        <div className="action-buttons">
          <button
            className="action-btn edit-button"
            onClick={() => navigate(`/edit/${id}`)}
          >
            ✏️ Editar
          </button>
          <button className="action-btn delete-button" onClick={handleDelete}>
            🗑️ Excluir
          </button>
          <button className="action-btn cancel-button" onClick={() => navigate("/")}>
            ⬅️ Voltar
          </button>
        </div>
      </div>

       {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <ConfirmationModal
          type="delete"
          title="⚠️ Confirmar Exclusão"
          message={
            <>
              <p>Você está prestes a excluir permanentemente o animal:</p>
              <div className="user-to-delete">
                <strong>{animal.nome}</strong>
                <span>ID: {animal.id}</span>
              </div>
              <p className="warning-text">Esta ação não pode ser desfeita!</p>
            </>
          }
          confirmLabel="🗑️ Confirmar Exclusão"
          cancelLabel="❌ Manter Animal"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
