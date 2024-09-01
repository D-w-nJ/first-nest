import { Injectable, NotFoundException } from '@nestjs/common';
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
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException('해당 아이디를 찾을 수 없습니다.');
    }

    return found;
  }

  create(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const board: Board = {
      //id: (this.boards.length + 1).toString(),
      id: uuid(),
      title: title,
      // title, 로 치환가능
      description: description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);

    return board;
  }

  delete(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);

    const found = this.getById(id);

    if (!found) {
      throw new NotFoundException('해당 아이디의 문서를 찾을 수 없습니다.');
    } else {
      this.boards.filter((board) => board.id !== id);
    }
  }

  updateStatus(id: string, status: BoardStatus): Board {
    const board = this.getById(id);
    board.status = status;
    return board;
  }
}
