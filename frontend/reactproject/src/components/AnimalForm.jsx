import React from "react";

/**
 * Formulário genérico para criar ou editar um animal.
 * É reutilizado tanto no cadastro (CreateAnimal) quanto na edição (UpdateAnimal).
 *
 * Props:
 *  - animal: objeto com dados (nome, idade, sexo, raca, porte)
 *  - setAnimal: setter do estado do animal (controla valores dos inputs)
 *  - onSubmit: função chamada no submit do formulário
 *  - onCancel: função para botão "Cancelar"
 *  - buttonLabel: texto exibido no botão de envio (ex.: "Salvar", "Criar", etc.)
 */
export default function AnimalForm({
  animal,
  setAnimal,
  onSubmit,
  onCancel,
  buttonLabel = "Salvar",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-fields">
        <input
          type="text"
          placeholder="Nome *"
          value={animal.nome}
          onChange={(e) => setAnimal({ ...animal, nome: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Idade *"
          value={animal.idade}
          onChange={(e) => setAnimal({ ...animal, idade: e.target.value })}
          min="0"
          max="20"
          required
        />

        <select
          value={animal.sexo}
          onChange={(e) => setAnimal({ ...animal, sexo: e.target.value })}
          required
        >
          <option value="">Selecione o sexo *</option>
          <option value="macho">Macho</option>
          <option value="femea">Fêmea</option>
        </select>

        <input
          type="text"
          placeholder="Raça *"
          value={animal.raca}
          onChange={(e) => setAnimal({ ...animal, raca: e.target.value })}
          required
        />

        <select
          value={animal.porte}
          onChange={(e) => setAnimal({ ...animal, porte: e.target.value })}
          required
        >
          <option value="">Selecione o porte *</option>
          <option value="pequeno">Pequeno</option>
          <option value="medio">Médio</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      <div className="action-buttons">
        <button type="submit" className="save-button">
          {buttonLabel}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          ❌ Cancelar
        </button>
      </div>
    </form>
  );
}
