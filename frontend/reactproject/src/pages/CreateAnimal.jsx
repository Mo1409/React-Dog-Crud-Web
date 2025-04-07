import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimalForm from "../components/AnimalForm";
import ConfirmationModal from "../components/ConfirmationModal";
import "../App.css";

/**
 * Página para cadastrar um novo animal.
 * Usa o componente AnimalForm para exibir inputs
 * e um modal de confirmação antes de enviar ao backend.
 */
export default function CreateAnimal() {
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

  // Submissão do formulário (validação simples e abre modal)
  const handleSubmit = () => {
    if (!animal.nome || !animal.idade || !animal.sexo || !animal.raca || !animal.porte) {
      setError("Todos os campos são obrigatórios");
      return;
    }
    setShowConfirm(true);
  };

  // Confirma criação (POST)
  const confirmCreate = async () => {
    try {
      const response = await fetch("http://localhost:8800/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(animal),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      navigate("/", {
        state: {
          feedback: {
            type: "success",
            message: "Animal cadastrado com sucesso!",
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
      <h1>Cadastrar Novo Animal</h1>
      <div className="modal-box">
        {error && <div className="feedback error">{error}</div>}

        {/* Formulário via AnimalForm */}
        <AnimalForm
          animal={animal}
          setAnimal={setAnimal}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
          buttonLabel="✅ Criar Novo Animal"
        />
      </div>

      {/* Modal de confirmação de criação */}
      {showConfirm && (
        <ConfirmationModal
          type="create"
          title="✅ Confirmar Cadastro"
          message={
            <>
              <p>Você está prestes a cadastrar o animal <strong>{animal.nome}</strong>!</p>
              <p>Idade: {animal.idade}</p>
              <p>Sexo: {animal.sexo}</p>
              <p>Raça: {animal.raca}</p>
              <p>Porte: {animal.porte}</p>
            </>
          }
          confirmLabel="📥 Cadastrar"
          cancelLabel="❌ Cancelar"
          onConfirm={confirmCreate}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
