import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';
import express from 'express';
import routes from './routes/index.js';
import { authenticateToken } from './middleware/auth.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

const app = express();

app.use(express.json());

app.use('/api/auth', routes.auth);

// Protected Routes
app.use('/api/users', authenticateToken, routes.users);
app.use('/api/tickets', authenticateToken, routes.tickets);

export { sequelize, User, Ticket };
