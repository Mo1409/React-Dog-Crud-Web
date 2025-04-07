import React from "react";

/**
 * Componente para paginação de listas.
 * Exibe botões numerados para mudar de página, além de botões
 * "Anterior" e "Próxima".
 *
 * Props:
 *  - currentPage: página atual
 *  - totalPages: número total de páginas
 *  - onPageChange: função chamada ao clicar em um número de página
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageButtons = () => {
    const b = [];
    const p = currentPage;
    const t = totalPages;

    const btn = (i) => (
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={p === i ? "active-page" : ""}
      >
        {i}
      </button>
    );

    // Se o total de páginas é pequeno, mostra todas
    if (t <= 7) {
      for (let i = 1; i <= t; i++) {
        b.push(btn(i));
      }
      return b;
    }

    // Se houver muitas páginas, exibe reticências e primeiras/últimas
    b.push(btn(1));

    if (p > 4) b.push(<span key="s1">...</span>);

    for (let i = Math.max(2, p - 1); i <= Math.min(t - 1, p + 1); i++) {
      b.push(btn(i));
    }

    if (p < t - 3) b.push(<span key="s2">...</span>);

    b.push(btn(t));

    return b;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        ◀️ Anterior
      </button>

      {renderPageButtons()}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Próxima ▶️
      </button>
    </div>
  );
}
