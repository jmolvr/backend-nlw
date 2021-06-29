import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid} from "uuid";
import { Exclude } from "class-transformer";



/**
 * @swagger
 *  components:
 *    schemas: 
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          id: 
 *            type: string
 *            description: The auto-generated id of the user
 *          name:
 *            type: string
 *            description: The name of user
 *          password:
 *            type: string
 *            description: The user's password
 *          created_at:
 *            type: string
 *            description: The date when user was created
 *        example:
 *            name: tester
 *            email: teste@email.com
 *            password: passwordnotsecure
 *                  
 */
@Entity('users')
export class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    admin: boolean;

    @Exclude()
    @Column()
    password: string;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}
