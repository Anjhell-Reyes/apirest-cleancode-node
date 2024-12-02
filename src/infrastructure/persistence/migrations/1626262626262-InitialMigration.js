//import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1626262626262 {
  async up(queryRunner) {
    // Aquí agregas las operaciones para realizar esta migración (crear tablas, insertar datos, etc.)

    // crear tabla
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT TRUE,
        start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP        
      );
    `);

    // insertar datos
    await queryRunner.query(`
      INSERT INTO tasks (title, description, completed, start_date, end_date)
      VALUES ('Proyectos', 'Presentar los proyectos', TRUE, '2021-07-14 00:00:00', '2021-07-14 00:00:00');
    `);

  }

  async down(queryRunner) {
    // Aquí agregas las operaciones para revertir esta migración
    await queryRunner.query(`
      DROP TABLE IF EXISTS tasks;
    `);

    // Si la migración es reversible, también debes revertir los datos insertados
    await queryRunner.query(`DELETE FROM tasks WHERE id = 1; `);
  }
}
