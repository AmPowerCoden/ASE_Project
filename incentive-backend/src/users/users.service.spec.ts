import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './user.schema';


const mockUserModel = {
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findUsers', () => {
    it('should return an array of users', async () => {
      const users = [{ name: 'Alice' }, { name: 'Bob' }];
      mockUserModel.find.mockReturnValue(users);

      const result = await service.findUsers();

      expect(result).toEqual(users);
    });
  });
});


  /*it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.each`
    name      | returnVal
    ${'john'} | ${{ userId: 1, username: 'john', password: 'changeme' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: User }) => {
      expect(await service.findOne(name)).toEqual(returnVal);
    },
  );*/
