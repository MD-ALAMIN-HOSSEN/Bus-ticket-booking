import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entity/Login.entity';
import { Info } from './entity/Info.entity';
import { Admin } from './entity/Admin.entity';
import { Manager } from './entity/Manager.entity';
import { Customer } from './entity/Customer.entity';
import { Agent } from './entity/Agent.entity';
import { CustomerAgent } from './entity/CustomerAgent.entity';
import { AdminManager } from './entity/AdminManager.entity';
import { ManagerAgent } from './entity/ManagerAgent.entity';
import { Bus } from './entity/Bus.entity';
import { Ticket } from './entity/Ticket.entity';
import { Feedback } from './entity/Feedback.entity';
import { Report } from './entity/Report.entity';
import { Notification } from './entity/Notification.entity';
import { TicketBookInfo } from './entity/TicketBookInfo.entity';
import { InfoModule } from './manager/info.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports:[ InfoModule,TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5001,
    username: 'postgres',
    password: '123',
    database: 'book ticket db',//Change to your database name
    entities: [
      Login,
      Info,
      Admin,
      Manager,
      Customer,
      Agent,
      CustomerAgent,
      AdminManager,
      ManagerAgent,
      Bus,
      Ticket,
      Feedback,
      Report,
      Notification,
      TicketBookInfo,
    ],
    autoLoadEntities: true,
    synchronize: true,
    }),
    ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
