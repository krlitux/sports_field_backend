module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('jugador', 'admin'),
      allowNull: false,
    },
  }, {
    tableName: 'Usuarios',
    timestamps: false,
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Reserva, { foreignKey: 'usuario_id', as: 'reservas' });
  };

  return Usuario;
};
