import express from 'express'
import { get_current_user, handle_google_auth, login_users, register_users } from '../controllers/user/usersControllers.js'
import { forgot_password, resend_otp_forgot_password, update_password, verify_forgot_password } from '../controllers/user/passwordControllers.js'
import { resend_otp, verify_otp } from '../controllers/user/otpControllers.js'
import { add_address, get_all_address, get_current_address } from '../controllers/user/addressControllers.js'
import { breadCrumb } from '../controllers/user/breadcrumbControllers.js'
import { get_all_products, get_related_products, new_arrivals, products_details } from '../controllers/user/productsControllers.js'
import { update_profile } from '../controllers/user/profileControllers.js'
import { add_to_cart, get_user_cart, update_cart_qty } from '../controllers/user/cartControllers.js'
const router = express.Router()


//=================User========================//

// Get

router.get('/get_current_user/:id',get_current_user)

router.get('/forgot_password/:email',forgot_password)

// Post

router.post('/register_users', register_users)

router.post('/login_users',login_users)

router.post('/verify_otp', verify_otp )

router.post('/resend_otp', resend_otp)

router.post('/handle_google_auth',handle_google_auth)

// forgot password

router.post('/verify_forgot_password', verify_forgot_password); 

router.post('/resend_otp_forgot_password', resend_otp_forgot_password);

router.post('/update_password',update_password)

// Put

router.put('/update_profile', update_profile);


//===================Products========================//

// Get

router.get('/get_all_products',get_all_products)

router.get('/products_details/:id',products_details);

router.get('/get_related_products/:id', get_related_products)

router.get('/new_arrivals',new_arrivals)

//=========================Address==================================//

// Get

router.get('/get_all_address/:id', get_all_address)

router.get('/get_current_address/:id', get_current_address)

// Post

router.post('/add_address',add_address)


//=========================Cart==================================//

// Get

router.get('/get_user_cart/:id', get_user_cart)

// Post

router.post('/add_to_cart',add_to_cart)

//=========================Cart==================================//

router.post('/update_cart_qty',update_cart_qty)

//=================BreadCrumb========================//

router.get('/breadCrumb/:productId',breadCrumb );

//===================================================//

export default router;









