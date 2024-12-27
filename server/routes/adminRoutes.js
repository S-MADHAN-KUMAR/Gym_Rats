import express from 'express';
import upload from '../middlewares/multer.js'
import { login } from '../controllers/admin/adminControllers.js';
import { add_products, block_products, delete_products, get_all_products, get_edit_products, update_products } from '../controllers/admin/productsControllers.js';
import { add_categories, block_categories, get_all_categories, get_edit_categories, update_categories } from '../controllers/admin/categoriesControllers.js';
import { block_users, get_all_users } from '../controllers/admin/usersControllers.js';
import { add_brands, get_all_brands, get_edit_brands, update_brands } from '../controllers/admin/brandsControllers.js';

const router = express.Router();

//===========================[ Auth ]=========================//

// Post

router.post('/login', login);

//========================[ Products ]=========================//

// Get

router.get('/get_all_products',get_all_products)

router.get('/get_edit_products', get_edit_products);

// Post

router.post('/add_products',upload.array('images', 5),add_products);

// Put

router.put('/block_products',block_products)

router.put('/update_products/:id',upload.array('images', 5),update_products)

// Delete

router.delete('/delete_products/:id', delete_products)

//=================[ Category ]=========================//

// Get

router.get('/get_all_categories', get_all_categories);

router.get('/get_edit_categories/:id', get_edit_categories);

// Post

router.post('/add_categories', upload.single('image'), add_categories);

// Put

router.put('/update_categories/:id', upload.single('image'), update_categories);

router.put('/block_categories',block_categories)

//=================Users=========================//

// Get

router.get('/get_all_users',get_all_users)

// Put

router.put('/block_users',block_users)

//====================Brands===========================//

// Get

router.get('/get_all_brands',get_all_brands)

router.get('/get_edit_brands', get_edit_brands)

// Post

router.post('/add_brands',upload.single('image'),add_brands)

// Put

router.put('/update_brands', upload.single('image'),update_brands)

//==============================================================//

export default router;
