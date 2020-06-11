<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200609121654 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE cdt (id INT AUTO_INCREMENT NOT NULL, plant_id INT NOT NULL, name VARCHAR(50) NOT NULL, INDEX IDX_E329B7ED1D935652 (plant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE checkitem (id INT AUTO_INCREMENT NOT NULL, zone_id INT DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, msn VARCHAR(255) NOT NULL, no_msn TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, is_closed TINYINT(1) NOT NULL, INDEX IDX_7BAB0299F2C3FAB (zone_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE company (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE intervenant (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, company VARCHAR(255) DEFAULT NULL, phone VARCHAR(20) DEFAULT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE intervention (id INT AUTO_INCREMENT NOT NULL, zone_id INT NOT NULL, quality_checked_by_id INT DEFAULT NULL, prod_checked_by_id INT DEFAULT NULL, msn VARCHAR(255) NOT NULL, no_msn TINYINT(1) NOT NULL, type_ncam VARCHAR(255) DEFAULT NULL, numero_ncam VARCHAR(255) DEFAULT NULL, reason VARCHAR(255) DEFAULT NULL, selected_nature VARCHAR(255) DEFAULT NULL, is_closed TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, is_call_confirmed TINYINT(1) NOT NULL, is_work_done TINYINT(1) NOT NULL, company VARCHAR(255) NOT NULL, is_quality_checked TINYINT(1) DEFAULT NULL, quality_comment VARCHAR(255) DEFAULT NULL, quality_checked_date DATETIME DEFAULT NULL, is_prod_checked TINYINT(1) DEFAULT NULL, prod_comment VARCHAR(255) DEFAULT NULL, prod_checked_date DATETIME DEFAULT NULL, INDEX IDX_D11814AB9F2C3FAB (zone_id), INDEX IDX_D11814AB635F1F28 (quality_checked_by_id), INDEX IDX_D11814AB3E602DE3 (prod_checked_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE intervention_intervenant (intervention_id INT NOT NULL, intervenant_id INT NOT NULL, INDEX IDX_D23959B8EAE3863 (intervention_id), INDEX IDX_D23959BAB9A1716 (intervenant_id), PRIMARY KEY(intervention_id, intervenant_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE plant (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, UNIQUE INDEX UNIQ_AB030D725E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tool (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(30) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tool_input_output (id INT AUTO_INCREMENT NOT NULL, checkitem_id INT DEFAULT NULL, intervention_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, quantity_input INT NOT NULL, quantity_output INT NOT NULL, object_id INT NOT NULL, INDEX IDX_8C23D32E9EAC4C72 (checkitem_id), INDEX IDX_8C23D32E8EAE3863 (intervention_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, username VARCHAR(255) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) DEFAULT NULL, phone_number VARCHAR(20) DEFAULT NULL, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) DEFAULT NULL, is_active TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_zone (user_id INT NOT NULL, zone_id INT NOT NULL, INDEX IDX_DA6A8CCEA76ED395 (user_id), INDEX IDX_DA6A8CCE9F2C3FAB (zone_id), PRIMARY KEY(user_id, zone_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE zone (id INT AUTO_INCREMENT NOT NULL, cdt_id INT NOT NULL, name VARCHAR(50) NOT NULL, INDEX IDX_A0EBC0072E4D2633 (cdt_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cdt ADD CONSTRAINT FK_E329B7ED1D935652 FOREIGN KEY (plant_id) REFERENCES plant (id)');
        $this->addSql('ALTER TABLE checkitem ADD CONSTRAINT FK_7BAB0299F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id)');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814AB9F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id)');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814AB635F1F28 FOREIGN KEY (quality_checked_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE intervention ADD CONSTRAINT FK_D11814AB3E602DE3 FOREIGN KEY (prod_checked_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE intervention_intervenant ADD CONSTRAINT FK_D23959B8EAE3863 FOREIGN KEY (intervention_id) REFERENCES intervention (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE intervention_intervenant ADD CONSTRAINT FK_D23959BAB9A1716 FOREIGN KEY (intervenant_id) REFERENCES intervenant (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE tool_input_output ADD CONSTRAINT FK_8C23D32E9EAC4C72 FOREIGN KEY (checkitem_id) REFERENCES checkitem (id)');
        $this->addSql('ALTER TABLE tool_input_output ADD CONSTRAINT FK_8C23D32E8EAE3863 FOREIGN KEY (intervention_id) REFERENCES intervention (id)');
        $this->addSql('ALTER TABLE user_zone ADD CONSTRAINT FK_DA6A8CCEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_zone ADD CONSTRAINT FK_DA6A8CCE9F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE zone ADD CONSTRAINT FK_A0EBC0072E4D2633 FOREIGN KEY (cdt_id) REFERENCES cdt (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE zone DROP FOREIGN KEY FK_A0EBC0072E4D2633');
        $this->addSql('ALTER TABLE tool_input_output DROP FOREIGN KEY FK_8C23D32E9EAC4C72');
        $this->addSql('ALTER TABLE intervention_intervenant DROP FOREIGN KEY FK_D23959BAB9A1716');
        $this->addSql('ALTER TABLE intervention_intervenant DROP FOREIGN KEY FK_D23959B8EAE3863');
        $this->addSql('ALTER TABLE tool_input_output DROP FOREIGN KEY FK_8C23D32E8EAE3863');
        $this->addSql('ALTER TABLE cdt DROP FOREIGN KEY FK_E329B7ED1D935652');
        $this->addSql('ALTER TABLE intervention DROP FOREIGN KEY FK_D11814AB635F1F28');
        $this->addSql('ALTER TABLE intervention DROP FOREIGN KEY FK_D11814AB3E602DE3');
        $this->addSql('ALTER TABLE user_zone DROP FOREIGN KEY FK_DA6A8CCEA76ED395');
        $this->addSql('ALTER TABLE checkitem DROP FOREIGN KEY FK_7BAB0299F2C3FAB');
        $this->addSql('ALTER TABLE intervention DROP FOREIGN KEY FK_D11814AB9F2C3FAB');
        $this->addSql('ALTER TABLE user_zone DROP FOREIGN KEY FK_DA6A8CCE9F2C3FAB');
        $this->addSql('DROP TABLE cdt');
        $this->addSql('DROP TABLE checkitem');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE intervenant');
        $this->addSql('DROP TABLE intervention');
        $this->addSql('DROP TABLE intervention_intervenant');
        $this->addSql('DROP TABLE plant');
        $this->addSql('DROP TABLE tool');
        $this->addSql('DROP TABLE tool_input_output');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_zone');
        $this->addSql('DROP TABLE zone');
    }
}
