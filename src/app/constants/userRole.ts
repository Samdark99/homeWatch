import { ABOUT, ADMIN, HOME, LOGIN } from "./paths";

export const USERROLE = {
    'role.admin': {
        'urls': [ADMIN, ABOUT],
        'homePage': ADMIN
    },
    'role.generalUser': {
        'urls': [HOME, ABOUT],
        'homePage': HOME
    }
}