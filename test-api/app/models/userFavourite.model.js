module.exports = (sequelize, Sequelize) => {
  const UserFavourite = sequelize.define("user_favourite", {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    content_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    release_date: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    vote_average: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    poster_path: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  }, {
    timestamps: false,
  });

  UserFavourite.associate = (models) => {
    UserFavourite.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return UserFavourite;
};
