/**
 * Modal de confirmação, usado para confirmar operações sensíveis
 * (ex.: excluir, editar, criar). Recebe diferentes props de acordo
 * com o tipo de operação.
 *
 * Props:
 *  - type: tipo de operação ("default", "delete", "edit", "create") 
 *          que altera a cor e estilo do modal/botão
 *  - title: título do modal
 *  - message: mensagem (string ou JSX) exibida ao usuário
 *  - confirmLabel: texto do botão de confirmação
 *  - cancelLabel: texto do botão de cancelamento
 *  - onConfirm: função chamada ao confirmar
 *  - onCancel: função chamada ao cancelar
 */
export default function ConfirmationModal({
    type = "default",
    title,
    message,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onConfirm,
    onCancel,
  }) {
    let modalClass = "confirm-modal";
    let confirmButtonClass = "action-btn confirm-button";
  
    // Escolhe classes diferentes baseadas no "type"
    if (type === "delete") {
      modalClass = "confirm-modal delete-confirm";
      confirmButtonClass = "action-btn delete-confirm-button";
    } else if (type === "edit") {
      modalClass = "confirm-modal edit-confirm";
      confirmButtonClass = "action-btn edit-confirm-button";
    } else if (type === "create") {
      modalClass = "confirm-modal create-confirm";
      confirmButtonClass = "action-btn create-confirm-button";
    }
  
    return (
      <div className="modal-overlay">
        <div className={`modal-box ${modalClass}`}>
          <h2>{title}</h2>
  
          <div className="confirmation-message">
            {typeof message === "string" ? <p>{message}</p> : message}
          </div>
  
          <div className="action-buttons">
            <button className={confirmButtonClass} onClick={onConfirm}>
              {confirmLabel}
            </button>
            <button className="action-btn cancel-button" onClick={onCancel}>
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
  