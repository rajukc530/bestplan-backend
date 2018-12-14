/**
 * Users Schema
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            planId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dob: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNo: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: true,
            },
            goal: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            height: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            weight: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            pal: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            isActive: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hasPaid: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            targetWeight: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            defaultScope: {
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
            },
            scopes: {
                nameScope: {
                    attributes: {
                        exclude: ['planId', 'createdAt', 'updatedAt', 'dob', 'gender', 'isActive',
                            'height', 'weight', 'goal',
                            'password', 'phoneNo', 'hasPaid'],
                    },
                },
                userScope: {
                    attributes: {
                        exclude: ['planId', 'updatedAt', 'isActive', 'height', 'weight', 'goal',
                            'password', 'phoneNo', 'hasPaid', 'trainingId', 'dietId', 'targetWeight', 'pal'],
                    },
                },
                profileScope: {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'isActive', 'password', 'phoneNo', 'hasPaid'],
                    },
                },

                planScope: {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'dob', 'gender', 'isActive',
                            'height', 'weight', 'goal',
                            'password', 'phoneNo', 'hasPaid'],
                    },
                },

                revenueScope: {
                    attributes: {
                        exclude: ['createdAt', 'dob', 'gender', 'isActive',
                            'height', 'weight', 'goal',
                            'password', 'phoneNo', 'hasPaid'],
                    },
                },
            },
        },
    );

    User.associate = (models) => {
        // associations can be defined here
        User.belongsTo(models.Plan, {
            as: 'UserPlan',
            through: 'Plan',
            foreignKey: 'planId',
        });

        User.hasOne(models.UserRoles, {
            as: 'UserRoles',
            foreignKey: 'userId',
        });

        User.hasOne(models.Training, {
            as: 'UserTraining',
            foreignKey: 'userId',
        });

        User.hasOne(models.Diet, {
            as: 'UserDiet',
            foreignKey: 'userId',
        });
    };

    return User;
};
