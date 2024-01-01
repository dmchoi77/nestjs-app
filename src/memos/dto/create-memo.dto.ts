export class CreateMemoDto {
  readonly content: string;

  readonly importance: number;

  readonly displayOrder: number;

  readonly date: Date;

  readonly user: string;
}
