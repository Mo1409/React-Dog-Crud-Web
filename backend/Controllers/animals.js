import db from "../db.js";

// -------------------- LISTAR ANIMAIS (com paginação) --------------------
export const getAnimals = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 16;
    const offset = (page - 1) * limit;

    db.query(
      "SELECT * FROM cachorros LIMIT ? OFFSET ?",
      [limit, offset],
      (err, data) => {
        if (err) {
          console.error("Erro ao buscar animais:", err);
          return res.status(500).json({ error: "Erro ao buscar animais." });
        }
        return res.status(200).json(data);
      }
    );
  } catch (err) {
    console.error("Erro ao buscar animais:", err);
    return res.status(500).json({ error: "Erro ao buscar animais." });
  }
};

// -------------------- BUSCAR ANIMAL POR ID --------------------
export const getAnimalById = (req, res) => {
  try {
    db.query(
      "SELECT * FROM cachorros WHERE id = ?",
      [req.params.id],
      (err, data) => {
        if (err) {
          console.error("Erro ao buscar animal:", err);
          return res.status(500).json("Erro ao buscar animal.");
        }
        if (data.length === 0) {
          return res.status(404).json("Animal não encontrado.");
        }
        return res.status(200).json(data[0]);
      }
    );
  } catch (err) {
    console.error("Erro ao buscar animal:", err);
    return res.status(500).json("Erro ao buscar animal.");
  }
};

// -------------------- CRIAR ANIMAL --------------------
export const createAnimal = (req, res) => {
  try {
    const { nome, idade, sexo, raca, porte } = req.body;

    const insertData = { nome, idade, sexo, raca, porte };
    db.query('INSERT INTO cachorros SET ?', insertData, (err) => {
      if (err) {
        console.error("Erro ao criar animal:", err);
        return res.status(500).json({ error: 'Erro no servidor' });
      }
      return res.status(201).json({ message: 'Animal criado!' });
    });
  } catch (err) {
    console.error("Erro ao criar animal:", err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};

// -------------------- ATUALIZAR ANIMAL --------------------
export const updateAnimal = (req, res) => {
  try {
    const { nome, idade, sexo, raca, porte } = req.body;
    const animalId = req.params.id;

    // Primeiro verifica se existe
    db.query(
      "SELECT * FROM cachorros WHERE id = ?",
      [animalId],
      (err, existing) => {
        if (err) {
          console.error("Erro ao verificar animal:", err);
          return res.status(500).json("Erro ao atualizar animal.");
        }

        if (existing.length === 0) {
          return res.status(404).json("Animal não encontrado.");
        }

        // Atualiza
        db.query(
          "UPDATE cachorros SET nome = ?, idade = ?, sexo = ?, raca = ?, porte = ? WHERE id = ?",
          [nome, idade, sexo, raca, porte, animalId],
          (err2) => {
            if (err2) {
              console.error("Erro ao atualizar animal:", err2);
              return res.status(500).json("Erro ao atualizar animal.");
            }
            return res.status(200).json("Animal atualizado com sucesso.");
          }
        );
      }
    );
  } catch (err) {
    console.error("Erro ao atualizar animal:", err);
    return res.status(500).json("Erro ao atualizar animal.");
  }
};

// -------------------- DELETAR ANIMAL --------------------
export const deleteAnimal = (req, res) => {
  try {
    const animalId = req.params.id;

    db.query(
      "DELETE FROM cachorros WHERE id = ?",
      [animalId],
      (err, result) => {
        if (err) {
          console.error("Erro ao excluir animal:", err);
          return res.status(500).json("Erro ao excluir animal.");
        }
        if (result.affectedRows === 0) {
          return res.status(404).json("Animal não encontrado.");
        }

        return res.status(200).json("Animal excluído com sucesso.");
      }
    );
  } catch (err) {
    console.error("Erro ao excluir animal:", err);
    return res.status(500).json("Erro ao excluir animal.");
  }
};

// -------------------- CONTAR TOTAL DE ANIMAIS (OARA PAGINAÇÃO) --------------------
export const getAnimalCount = (req, res) => {
  try {
    db.query('SELECT COUNT(*) as total FROM cachorros', (err, result) => {
      if (err) {
        console.error("Erro ao contar animais:", err);
        return res.status(500).json("Erro ao contar animais");
      }
      return res.status(200).json({ total: result[0].total });
    });
  } catch (err) {
    console.error("Erro ao contar animais:", err);
    return res.status(500).json("Erro ao contar animais");
  }
};
