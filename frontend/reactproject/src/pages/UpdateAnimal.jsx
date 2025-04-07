import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnimalForm from "../components/AnimalForm";
import ConfirmationModal from "../components/ConfirmationModal";
import "../App.css";

/**
 * Página para editar um animal existente.
 * Carrega os dados do animal pelo ID e exibe o formulário
 * (AnimalForm). Ao submeter, abre um modal de confirmação
 * antes de enviar a requisição PUT ao backend.
 */
export default function UpdateAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState({
    nome: "",
    idade: "",
    sexo: "",
    raca: "",
    porte: "",
  });
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // Carrega dados do animal específico
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

    if (id) {
      fetchAnimal();
    }
  }, [id]);

  // Valida e exibe modal de confirmação
  const handleSubmit = () => {
    if (!animal.nome || !animal.idade || !animal.sexo || !animal.raca || !animal.porte) {
      setError("Todos os campos são obrigatórios");
      return;
    }
    setShowConfirm(true);
  };

  // Confirma atualização (PUT)
  const confirmUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8800/animals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(animal),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      // Redireciona com feedback de sucesso
      navigate("/", {
        state: {
          feedback: {
            type: "success",
            message: "Animal atualizado com sucesso!",
          },
        },
      });
    } catch (err) {
      setError(err.message);
      setShowConfirm(false);
    }
  };

  return (
    <div className="container">
      <h1>Editar Animal</h1>
      <div className="modal-box">
        {error && <div className="feedback error">{error}</div>}

        {/* Formulário genérico com AnimalForm */}
        <AnimalForm
          animal={animal}
          setAnimal={setAnimal}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
          buttonLabel="✅ Salvar Alterações"
        />
      </div>

      {/* Modal de confirmação de edição */}
      {showConfirm && (
        <ConfirmationModal
            type="edit"
            title="✏️ Confirmar Edição"
            message={
            <>
                <p>Você está prestes a atualizar o animal:</p>
                <p><strong>Nome:</strong> {animal.nome}</p>
                <p><strong>Idade:</strong> {animal.idade}</p>
                <p><strong>Sexo:</strong> {animal.sexo}</p>
                <p><strong>Raça:</strong> {animal.raca}</p>
                <p><strong>Porte:</strong> {animal.porte}</p>
            </>
            }
            confirmLabel="✏️ Confirmar Edição"
            cancelLabel="❌ Cancelar"
            onConfirm={confirmUpdate}
            onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
