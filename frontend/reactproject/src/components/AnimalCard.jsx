import React from "react";
import "../App.css";

/**
 * Representa um cartão individual de cada animal na lista.
 * Exibe o nome do animal e disponibiliza botões de ação:
 *  - Ver (onView)
 *  - Editar (onEdit)
 *  - Excluir (onDelete)
 *
 * Props:
 *  - animal: objeto do tipo { id, nome, ... }
 *  - onView: função chamada ao clicar no botão "Ver"
 *  - onEdit: função chamada ao clicar no botão "Editar"
 *  - onDelete: função chamada ao clicar no botão "Excluir"
 */
export default function AnimalCard({ animal, onView, onEdit, onDelete }) {
  return (
    <li className="list-li">
      <div className="card-content">
        <div className="user-name">{animal.nome}</div>
      </div>
      <div className="user-actions">
        <button className="view-button action-btn" onClick={onView}>
          🔍
        </button>
        <button className="edit-button action-btn" onClick={onEdit}>
          ✏️
        </button>
        <button className="delete-button action-btn" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </li>
  );
}
