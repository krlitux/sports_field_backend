module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define('Reserva', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cancha_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'Reservas',
    timestamps: false,
  });

  Reserva.associate = (models) => {
    Reserva.belongsTo(models.Cancha, { foreignKey: 'cancha_id', as: 'cancha' });
    Reserva.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  };

  return Reserva;
};
