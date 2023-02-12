import { Admin_users } from "../entity/admin_users";

const Validators = (args: Admin_users): string => {
    const errors = ['Username must have at least 6 characters', 
    'Password must have at least 6 characters',
    'Role must be selected' ]

    let error = (args.username.length < 6 ? errors[0] : args.password.length < 6 ? errors[1] : args.roles.length === 0 ? errors[2] : "")
    return error
}

export default Validators