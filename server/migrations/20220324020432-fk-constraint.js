"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("filmlogs", {
      fields: ["user_id"],
      type: "foreign Key",
      name: "FK_filmlogs_users",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      //유저필드의 아이디가 삭제되었을 때 해당 아이디와 관계설정된 다른 테이블의 레코드도 삭제된다.
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("filmtalks", {
      fields: ["user_id"],
      type: "foreign Key",
      name: "FK_filmtalks_users",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("filmlog_comments", {
      fields: ["user_id"],
      type: "foreign Key",
      name: "FK_filmlog_comments_users",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("filmlog_comments", {
      fields: ["filmlog_id"],
      type: "foreign Key",
      name: "FK_filmlog_comments_filmlogs",
      references: {
        table: "filmlogs",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("filmtalk_comments", {
      fields: ["user_id"],
      type: "foreign Key",
      name: "FK_filmtalk_comments_users",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("filmtalk_comments", {
      fields: ["filmtalk_id"],
      type: "foreign Key",
      name: "FK_filmtalk_comments_filmtalks",
      references: {
        table: "filmtalks",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("filmlogs", "FK_filmlogs_users");
    await queryInterface.removeConstraint("filmtalks", "FK_filmtalks_users");
    await queryInterface.removeConstraint(
      "filmlog_comments",
      "FK_filmlog_comments_users"
    );
    await queryInterface.removeConstraint(
      "filmlog_comments",
      "FK_filmlog_comments_filmlogs"
    );
    await queryInterface.removeConstraint(
      "filmtalk_comments",
      "FK_filmtalk_comments_users"
    );
    await queryInterface.removeConstraint(
      "filmtalk_comments",
      "FK_filmtalk_comments_filmtalks"
    );
  },
};
