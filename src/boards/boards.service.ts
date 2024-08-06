import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAll(): Board[] {
        return this.boards;
    }

    getById(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    create(createBoardDto: CreateBoardDto): Board {
        const {title, description} = createBoardDto;
        const board: Board = {
            //id: (this.boards.length + 1).toString(),
            id: uuid(),
            title: title,
            // title, 로 치환가능
            description: title,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);

        return board;
    }

    delete(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateStatus(id: string, status: BoardStatus): Board {
        const board = this.getById(id);
        board.status = status;
        return board;
    }
}
