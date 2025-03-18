module.exports = (sequelize, Sequelize) => {
  const UserFavourite = sequelize.define("user_favourite", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    content_id: {
      type: Sequelize.INTEGER,
      allowNull: false, 
    }
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