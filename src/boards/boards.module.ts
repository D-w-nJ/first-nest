import { Module } from "@nestjs/common";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { BoardsRepository } from "./board.repository";
import { DataSource } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {
}
