<<<<<<< HEAD
import log from 'log-beautify';

export * from './src/connection';
export * from './src/data_types';
export * from './src/decorators';
export { Model } from './src/model';
export { QueryBuilder } from './src/query_builder';

import {
  Column,
  PrimaryGeneratedColumn,
  Relation,
  Table,
  CreateDateColumn,
} from './src/decorators';
import { Model } from './src/model';
import { Entity as TOEntity } from 'typeorm';
import { VARCHAR } from './src/data_types';
import Sequelize from 'sequelize';
import { ConnectionManager } from './src/connection/ConnectionManager';
import { userInfo } from 'os';
import { HelperModel } from './src/decorators/HelperModel';
import { INTEGER, TIMESTAMP } from '.';

log.setSymbols({
  success: '[phamORM] ✔ ',
  error: '[phamORM] ✖ ',
  info: '[phamORM] 🛈 ',
});

// ConnectionManager.createConnection({
//   name: 'accord_main',
//   uri: 'postgres://pham:0wpEKuvvDA5i60Wdd9a7WaEW525TJzvy@frankfurt-postgres.render.com/accord_main?sslmode=require',
// });

// @HelperModel('accord_main', { logQuery: true })
// class ModelHelper extends Model {}

// @Table('accord_main', { force: true, logQuery: { run: true } })
// class User extends Model {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   first_name = VARCHAR(10);

//   @CreateDateColumn()
//   created_at = TIMESTAMP;
// }

// const newUser = new User();
// newUser.id = 1;
// newUser.save();
// newUser.softDelete({
//   table: { columns: { first_name: 'user_id', type: INTEGER } },
// });
// User.findByPk(1).then((res) => console.log(res));

// User.find('id', {
//   where: { id: 1 },
// });

// @Table('accord_main')
// class Profile {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Relation(User)
//   user_id: number;
// }
=======
import log from 'log-beautify';

export * from './src/connection';
export * from './src/data_types';
export * from './src/decorators';
export { Model } from './src/model';
export { QueryBuilder } from './src/query_builder';

import {
  Column,
  PrimaryGeneratedColumn,
  Relation,
  Table,
  CreateDateColumn,
} from './src/decorators';
import { Model } from './src/model';
import { Entity as TOEntity } from 'typeorm';
import { VARCHAR } from './src/data_types';
import Sequelize from 'sequelize';
import { ConnectionManager } from './src/connection/ConnectionManager';
import { userInfo } from 'os';
import { HelperModel } from './src/decorators/HelperModel';
import { INTEGER, TIMESTAMP } from '.';

log.setSymbols({
  success: '[phamORM] ✔ ',
  error: '[phamORM] ✖ ',
  info: '[phamORM] 🛈 ',
});

// ConnectionManager.createConnection({
//   name: 'accord_main',
//   uri: 'postgres://pham:0wpEKuvvDA5i60Wdd9a7WaEW525TJzvy@frankfurt-postgres.render.com/accord_main?sslmode=require',
// });

// @HelperModel('accord_main', { logQuery: true })
// class ModelHelper extends Model {}

// @Table('accord_main', { force: true, logQuery: { run: true } })
// class User extends Model {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   first_name = VARCHAR(10);

//   @CreateDateColumn()
//   created_at = TIMESTAMP;
// }

// const newUser = new User();
// newUser.id = 1;
// newUser.save();
// newUser.softDelete({
//   table: { columns: { first_name: 'user_id', type: INTEGER } },
// });
// User.findByPk(1).then((res) => console.log(res));

// User.find('id', {
//   where: { id: 1 },
// });

// @Table('accord_main')
// class Profile {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Relation(User)
//   user_id: number;
// }
>>>>>>> 8310f9d (19:37 24/12/2021)
