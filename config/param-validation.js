import Joi from 'joi';

export default {
    // POST /api/questions
    registerUser: {
        body: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            dob: Joi.string().required(),
            gender: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            phoneNo: Joi.number().required(),
            goal: Joi.string().required(),
            height: Joi.number().required(),
            weight: Joi.number().required(),
        },
    },
    // POST /api/v1/login
    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
    },

    profile: {
        body: {
            username: Joi.string().required(),
        },
    },

    plan: {
        body: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            description: Joi.string().required(),
        },
    },

    diet: {
        body: {
            name: Joi.string().required(),
            protein: Joi.string().required(),
            carbs: Joi.string().required(),
            fat: Joi.string().required(),
        },
    },

    userWeight: {
        body: {
            weight: Joi.number().required(),
        },
    },

    programs: {
        body: {
            planName: Joi.string().required(),
        },
    },

    dietProgram: {
        body: {
            name: Joi.string().required(),
        },
    },

    trainingProgram: {
        body: {
            name: Joi.string().required(),
        },
    },

    bothProgram: {
        body: {
            trainingPerWeek: Joi.string().required(),
            dietPlan: Joi.string().required(),
        },
    },

    stripeOrder: {
        body: {
            cardHolderName: Joi.string().required(),
            cardNumber: Joi.number().required(),
            expiryMonth: Joi.number().required(),
            expiryYear: Joi.number().required(),
            cvc: Joi.number().required(),
            token: Joi.string().required(),
        },
    },
};
