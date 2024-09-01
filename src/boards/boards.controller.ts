import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { Board, BoardStatus } from "./board";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";

@Controller("boards")
export class BoardsController {
  boardsService: BoardsService;

  constructor(boardsService: BoardsService) {
    this.boardsService = boardsService;
  }

  // constructor(private boardsService: BoardsService){} 로 대체가능(프로퍼티 선언까지)

  @Get("/")
  getAll(): Board[] {
    return this.boardsService.getAll();
  }

  @Get("/:id")
  get(@Param("id") id: string): Board {
    return this.boardsService.getById(id);
  }

  @Post("/")
  @UsePipes(ValidationPipe)
  create(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.create(createBoardDto);
  }

  @Delete("/:id")
  delete(@Param("id") id: string): void {
    return this.boardsService.delete(id);
  }

  @Patch("/:id/status")
  updateStatus(
    @Param("id") id: string,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus
  ): Board {
    return this.boardsService.updateStatus(id, status);
  }
}
