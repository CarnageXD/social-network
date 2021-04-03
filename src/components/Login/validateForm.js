export const validateForm = {
    email: ({
        required: 'email required',
        maxLength: { value: 64, message: "You're exceeded maximum email length" },
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email, please use format email@example.ex'
        },
    }),
    password: ({
        required: "password required",
        minLength: { value: 6, message: 'min password length is 6' },
        maxLength: { value: 32, message: 'max password length is 32' },
    })

}