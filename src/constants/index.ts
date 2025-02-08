import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms"
import {
    HOVER_MENU,
    HoverMenuProps,
    LANDING_PAGE_MENU,
    MenuProps,
} from "./menus"

type LendXConstantsProps = {
    landingPageMenu: MenuProps[]
    hoverMenu: HoverMenuProps[]
    signUpForm: AuthFormProps[]
    signInForm: AuthFormProps[]
}

export const LENDX_CONSTANTS: LendXConstantsProps = {
    landingPageMenu: LANDING_PAGE_MENU,
    hoverMenu: HOVER_MENU,
    signUpForm: SIGN_UP_FORM,
    signInForm: SIGN_IN_FORM,
}
