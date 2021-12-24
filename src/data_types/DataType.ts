export abstract class DataType {
  value?: any;

  constructor(
    public key: string,
    public sqlTypes: { [name: string]: string | Error }
  ) {}
}
