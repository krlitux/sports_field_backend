module.exports = (sequelize, DataTypes) => {
  const Cancha = sequelize.define('Cancha', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'precio_por_hora',
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Proveedores',
        key: 'id',
      },
    },
  }, {
    tableName: 'Canchas',
    timestamps: false,
  });

  Cancha.associate = (models) => {
    Cancha.belongsTo(models.Proveedor, { foreignKey: 'proveedor_id', as: 'proveedor' });
    Cancha.hasMany(models.Reserva, { foreignKey: 'cancha_id' });
  };

  return Cancha;
};
