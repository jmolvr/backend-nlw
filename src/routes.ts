import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ensureAdmin } from './middlewares/ensureAdmin';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUserController } from './controllers/ListUserController';
const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsService = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUserController = new ListUserController();


/**
 * components:
 *      securitySchemes:
 *          basicAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *      name: Users
 *      description: API To manage users
 */

/**
 * @swagger
 * tags:
 *      name: Auth
 *      description: Auth API
 */

/**
 * @swagger
 * tags:
 *      name: Tags
 *      description: API To manage tags
 */

/**
 * @swagger
 * tags:
 *      name: Compliments
 *      description: API To manage compliments
 */

/** 
 * @swagger
 * 
 * /users:
 *   get:
 *      summary: A list of users
 *      tags: [Users]
 *      security: 
 *          - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *          "200":
 *              description: A list of users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: string
 *                                  name: 
 *                                      type: string
 *                                  email:
 *                                      type: string
 *                                  admin:
 *                                      type: boolean
 *                                  created_at:
 *                                      type: string
 *                                  updated_at:
 *                                      type: string
 *                              example: 
 *                                  id: "11b24b6c-17b2-417d-ad04-04309214a1ff"
 *                                  name: testeruser
 *                                  email: tester@email.com
 *                                  admin: true
 *                                  created_at: 2021-06-28T23:59:07.000Z
 *                                  updated_at: 2021-06-28T23:59:07.000Z
 *          "401":
 *              description: You need an access token
 *   post:
 *      summary: Creates a new user
 *      tags: [Users]
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      requestBody:
 *            description: The user to create
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - email
 *                          - password
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          admin:
 *                              type: boolean
 *                  example: 
 *                      name: testeruser
 *                      email: tester@email.com
 *                      password: testerpassword
 *                      admin: true
 *      responses: 
 *          "200": 
 *              description: The user created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          "400":
 *              description: Field(s) invalid   
*/
router.get("/users", ensureAuthenticated, listUserController.handle)
router.post("/users", createUserController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsService.handle)


/** 
 * @swagger
 * 
 * /login:
 *   post:
 *      tags: [Auth]
 *      summary: Authenticate a user
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      requestBody:
 *            description: Auth
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                  example: 
 *                      email: tester@email.com
 *                      password: testerpassword
 *      responses: 
 *          "200": 
 *              description: Return token
 *          "400":
 *              description: Field(s) invalid   
*/
router.post("/login", authenticateUserController.handle);


router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);



router.post("/compliments", ensureAuthenticated, createComplimentController.handle);


router.get("/tags", listTagsController.handle);



export { router }