import { Injectable, NotFoundException } from "@nestjs/common";
import { Board } from "./board.entity";
import { BoardsRepository } from "./board.repository";
import { In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: BoardsRepository) {
  }

  // getAll(): Board[] {
  //   return this.boards;
  // }

  getAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  // getById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //
  //   if (!found) {
  //     throw new NotFoundException('해당 아이디를 찾을 수 없습니다.');
  //   }
  //
  //   return found;
  // }

  async getById(id: number): Promise<Board> {
    const found = await this.boardsRepository.findOneBy({ id });
    // await을 쓰면 다 처리가 된것을 받는것이다.(blocking)
    // 이렇게 되면 getById는 비동기적으로 실행되고 메인스레드는 코드를 계속실행시킨다. 그리고 getById는 데이터베이스로부터 값을 받는것을 기다리게 된다.

    if (!found) {
      throw new NotFoundException("Can't find board with id " + id);
    }

    return found;
  }

  // create(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     //id: (this.boards.length + 1).toString(),
  //     id: uuid(),
  //     title: title,
  //     // title, 로 치환가능
  //     description: description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //
  //   return board;
  // }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsRepository.createBoard(createBoardDto);
  }

  // delete(id: string): void {
  //   this.boards = this.boards.filter((board) => board.id !== id);
  //
  //   const found = this.getById(id);
  //
  //   if (!found) {
  //     throw new NotFoundException('해당 아이디의 문서를 찾을 수 없습니다.');
  //   } else {
  //     this.boards.filter((board) => board.id !== id);
  //   }
  // }

  async delete(id: number): Promise<void> {
    const result = await this.boardsRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException("Can't find board with id " + id);
    }

    console.log(result);
  }

  // updateStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getById(id);
  //   board.status = status;
  //   return board;
  // }

  async updateStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getById(id);

    if(!board) {
      throw new NotFoundException("Can't find board with id " + id);
    }
    board.status = status;
    await this.boardsRepository.update(id, board);

    return board;
  }
}
