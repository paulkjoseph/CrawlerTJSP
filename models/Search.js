module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Search', {
      id                : { type: DataTypes.UUID,           field: 'id',                 primaryKey: true, autoIncrement: true  },
      document    : { type: DataTypes.STRING(255),    field: 'document',    allowNull : true                       },
      class              : { type: DataTypes.STRING(255),    field: 'class',               allowNull : true                       },
      area            : { type: DataTypes.STRING(255),    field: 'area',             allowNull : true                       },
      subject              : { type: DataTypes.STRING(255),    field: 'subject',               allowNull : true                       },
      division          : { type: DataTypes.STRING(255),    field: 'division',           allowNull : true                       },
      details      : { type: DataTypes.STRING(255),    field: 'details',       allowNull : true                       },
      control             : { type: DataTypes.STRING(255),    field: 'control',              allowNull : true                       },
      judge              : { type: DataTypes.STRING(255),    field: 'judge',               allowNull : true                       },
      value              : { type: DataTypes.STRING(255),    field: 'value',               allowNull : true                       },
      applicant           : { type: DataTypes.STRING(255),    field: 'applicant',           allowNull : true                       },
      appLawyer              : { type: DataTypes.STRING(255),    field: 'appLawyer',               allowNull : true                       },
      required          : { type: DataTypes.STRING(255),    field: 'required',          allowNull : true                       },
      client          : { type: DataTypes.STRING(255),    field: 'client',          allowNull : true                       }        
    }, {
      schema: 'crawler',
      tableName: 'crawler',
      timestamps: false,
      underscored: true
    })
    return model
  }
  
