import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "../boards/board.entity";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],  // 엔티티를 기반으로 테이블을 생성하기 떄문에, 엔티티가 있는곳을 설정해줘야 한다.
  synchronize: true,
};