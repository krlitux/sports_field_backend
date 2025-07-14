module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define('Proveedor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    razon_social: {
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
    }
  }, {
    tableName: 'Proveedores',
    timestamps: false,
  });

  Proveedor.associate = (models) => {
    Proveedor.hasMany(models.Cancha, { foreignKey: 'proveedor_id', as: 'canchas' });
  };

  return Proveedor;
};
