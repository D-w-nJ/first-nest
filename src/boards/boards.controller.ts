import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board';

@Controller('boards')
export class BoardsController {
    boardsService: BoardsService;

    constructor(boardsService: BoardsService){
        this.boardsService = boardsService;
    }
    // constructor(private boardsService: BoardsService){} 로 대체가능(프로퍼티 선언까지)

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAll();
    }

    @Post('/')
    create(@
        Body('title') title, 
        @Body('description') description)
    : Board{
        return this.boardsService.create(title, description);
    }
}
