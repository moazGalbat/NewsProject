import SimpleSchema from "simpl-schema";




const schema = {
    firstName: {
        type: String,
        required: true,
        min: 3,
        max:20
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max:20,
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.EmailWithTLD,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    passwordConfirmation: {
        type: String,
        required: true,
        min: 8,
        custom() {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        },
    }
};

const signupSchema = new SimpleSchema(schema)

signupSchema.messageBox.messages({
    en: {
      passwordMismatch: 'Passwords do not match!',
    },
  });

export default signupSchema;