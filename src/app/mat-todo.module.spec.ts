import { MatTodoModule } from './mat-todo.module';

describe('MatTodoModule', () => {
  let matTodoModule: MatTodoModule;

  beforeEach(() => {
    matTodoModule = new MatTodoModule();
  });

  it('should create an instance', () => {
    expect(matTodoModule).toBeTruthy();
  });
});
