import SimpleSchema from "simpl-schema";

const schema = {
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
}

const loginSchema = new SimpleSchema(schema)

export default loginSchema;