import { ABOUT, ADMIN, HOME, LOGIN } from "./paths";

export const USERROLE = {
    'Admin': {
        'urls': [ADMIN, ABOUT],
        'homePage': ADMIN
    },
    'General': {
        'urls': [HOME, ABOUT],
        'homePage': HOME
    }
}