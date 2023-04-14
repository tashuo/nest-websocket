import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1681395645817 implements MigrationInterface {
  name = 'Init1681395645817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(100) NOT NULL COMMENT 'password', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chat_messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL COMMENT 'content', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fromUserId\` int NULL, \`toUserId\` int NULL, INDEX \`idx_to\` (\`toUserId\`), INDEX \`idx_from_to\` (\`fromUserId\`, \`toUserId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_messages\` ADD CONSTRAINT \`FK_9ee145fd616227448de53646872\` FOREIGN KEY (\`fromUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_messages\` ADD CONSTRAINT \`FK_fbfdf0b8ee76855843441cc7551\` FOREIGN KEY (\`toUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`chat_messages\` DROP FOREIGN KEY \`FK_fbfdf0b8ee76855843441cc7551\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_messages\` DROP FOREIGN KEY \`FK_9ee145fd616227448de53646872\``,
    );
    await queryRunner.query(`DROP INDEX \`idx_from_to\` ON \`chat_messages\``);
    await queryRunner.query(`DROP INDEX \`idx_to\` ON \`chat_messages\``);
    await queryRunner.query(`DROP TABLE \`chat_messages\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
