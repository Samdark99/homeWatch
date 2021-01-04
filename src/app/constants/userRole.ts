import { ABOUT, ADMIN, HOME, USER } from "./paths";

export const USERROLE = {
    'role.admin': {
        'urls': [ADMIN, ABOUT, USER],
        'homePage': ADMIN
    },
    'role.generalUser': {
        'urls': [HOME, ABOUT],
        'homePage': HOME
    }
}